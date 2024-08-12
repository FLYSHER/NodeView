var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.ShaderView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.SHADER_VIEW );
    },

    //override
    drawInspector : function() {
        const owner = this.getOwner();

        const rootDiv = HtmlHelper.createComponentRootDiv();
        const iconObj = {
            className : "fa-solid fa-bomb",
            style : "color: #d0b8f4;"
        };
        const titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        this.rootDiv = rootDiv;

        /** 적용 리스트
         * 1. Sprite
         * 2. ImageView
         * 3. Label
         */
        // todo 현재는 이미지뷰 에서만 뽑아냄
        if (owner._textureFile) {
            const textureName = Genie.Utils.getSpriteFrameTextureName( owner._textureFile );
            const texture = cc.textureCache.getTextureForKey( 'image/' + textureName);
            if (texture) {
                const shaderProgram = texture.getShaderProgram();
                if (shaderProgram) {
                    const program = shaderProgram.getProgram();

                    // WebGL 컨텍스트 가져오기
                    const gl = cc._renderContext;

                    // 링크 상태 확인
                    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
                    HtmlHelper.createOneLongTextInput( rootDiv, "linked? ", linked, true);

                    // 유니폼 변수 확인
                    const div_uniform = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
                    HtmlHelper.createLabel( div_uniform, "Uniforms", "component_groupTitleLabel" );

                    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
                    for (let i = 0; i < uniformCount; i++) {
                        const uniformInfo = gl.getActiveUniform(program, i);
                        const location = gl.getUniformLocation(program, uniformInfo.name);
                        HtmlHelper.createShaderAttrib(div_uniform, uniformInfo.name.toString(), [
                            uniformInfo.type.toString(),
                            uniformInfo.size.toString(),
                            !! location, // location 은 포인터 정보만 담고 있음. gl.uniform1f(location, value); 로 값 변경 가능
                        ],[
                            true,
                            true,
                            true,
                        ], null);
                    }


                    // 쉐이더 속성 확인
                    const div_attribute = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
                    HtmlHelper.createLabel( div_attribute, "Attribute", "component_groupTitleLabel" );

                    const attributeCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
                    for(let i = 0; i < attributeCount; i++) {
                        const attributeInfo = gl.getActiveAttrib(program, i);
                        const location = gl.getAttribLocation(program, attributeInfo.name);
                        HtmlHelper.createShaderAttrib(div_attribute, attributeInfo.name.toString(), [
                            attributeInfo.type.toString(),
                            attributeInfo.size.toString(),
                            !! location,
                        ], [
                            true,
                            true,
                            true,
                        ], null);
                    }

                    // 버텍스 쉐이더 코드
                    const vertexShader = gl.getAttachedShaders(program).find(shader => gl.getShaderParameter(shader, gl.SHADER_TYPE) === gl.VERTEX_SHADER);
                    const vertexSource = gl.getShaderSource(vertexShader);

                    HtmlHelper.createOneLongTextInput(rootDiv, 'vertex code', vertexSource, true, null);

                    // 프래그먼트 쉐이더 코드
                    const fragmentShader = gl.getAttachedShaders(program).find(shader => gl.getShaderParameter(shader, gl.SHADER_TYPE) === gl.FRAGMENT_SHADER);
                    const fragmentSource = gl.getShaderSource(fragmentShader);

                    HtmlHelper.createOneLongTextInput(rootDiv, 'fragment code', fragmentSource, true, null);


                } else {
                    cc.warn("shaderProgram is null");
                }
            } else {
                cc.warn("texture is null");
            }
        } else {
            cc.warn("textureFile is null");
        }
    },
});