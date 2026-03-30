"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreateMenu = onCreateMenu;
exports.onAssetMenu = onAssetMenu;
exports.onDBMenu = onDBMenu;
exports.onPanelMenu = onPanelMenu;
const path_1 = require("path");
// import * as path from 'path'; // 전체를 가져와서 path.join() 식으로 써도 됩니다.
/** [ assetInfo ]
    displayName: '',
    extends: [],
    importer: '*',
    isDirectory: false,
    instantiation: undefined,
    imported: true,
    invalid: false,
    name: 'PU_PopCubeRstoneUI.ExportJson',
    file: '/Users/cswq327/cocos_project/test_project_01/assets/legacy_json/PU_PopCubeRstoneUI.ExportJson',
    redirect: undefined,
    readonly: false,
    type: 'cc.Asset',
    url: 'db://assets/legacy_json/PU_PopCubeRstoneUI.ExportJson',
    uuid: '75c9eeca-f144-4bd8-ac84-a450e3ee4a55'
*/
function onCreateMenu(assetInfo) {
    return [
        {
            label: "import-legacy-to-prefab",
            click() {
                if (!assetInfo) {
                    console.log('헤더 메뉴에서 생성 명령을 받았습니다.');
                }
                else {
                    console.log('디렉토리 자산 상세 정보:', assetInfo);
                }
            },
        },
    ];
}
// 나머지 메뉴 함수들도 필요하다면 정의
function onAssetMenu(assetInfo) {
    // 1. 방어 코드: assetInfo가 제대로 넘어오는지 확인
    if (!assetInfo || !assetInfo.file) {
        return [];
    }
    // 2. name 속성이나 file 경로에서 확장자 추출
    const ext = (0, path_1.extname)(assetInfo.name || assetInfo.file).toLowerCase();
    // 3. .ExportJson 파일인 경우에만 메뉴 노출
    if (ext === '.exportjson') {
        return [
            {
                label: "Legacy -> Prefab 변환",
                click() {
                    // 메인 프로세스(main.ts)로 assetInfo 전달
                    // main.ts에서도 이제 assetInfo.file을 통해 경로를 읽게 됩니다.
                    console.log("[MAIN] file onclick");
                    Editor.Message.send('asset-test', 'execute-import', assetInfo);
                }
            }
        ];
    }
    return [];
    // // ExportJson 일때만 메뉴 호출
    // if( assetInfo && assetInfo.path.endsWith('.ExportJson') ) {
    //       console.log( assetInfo );
    //     return [
    //         {
    //             label: "[custom] legacy to prefab",
    //             click() {
    //                 // 메인 프로세스에 정의된 'execute-import' 메시지 호출
    //                 console.log("onclick OnAssetMenu");
    //                 Editor.Message.send('asset-test', 'execute-import', assetInfo);
    //             },
    //         },
    //     ];
    // }
    // return [];
    // return [
    //     {
    //         // label : "test-asset-menu",
    //         // click() {
    //         //     console.log("클릭 test-asset-menu ");
    //         // }
    //         label: "legacy to prefab",
    //         click() {
    //             // 메인 프로세스에 정의된 'execute-import' 메시지 호출
    //             console.log("onclick OnAssetMenu");
    //             Editor.Message.send('asset-test', 'execute-import', assetInfo);
    //         },
    //     }
    // ]; 
}
function onDBMenu(assetInfo) {
    return [
        {
            label: "test-db-menu",
            click() {
                console.log("클릭 test-db-menu ");
            }
        }
    ];
}
function onPanelMenu(assetInfo) {
    return [
        {
            label: "test-panel-menu",
            click() {
                console.log("클릭 test-panel-menu ");
            }
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zb3VyY2UvYXNzZXRzLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQkEsb0NBYUM7QUFHRCxrQ0EyREM7QUFDRCw0QkFTQztBQUNELGtDQVNDO0FBbkhELCtCQUFxQztBQUNyQyxvRUFBb0U7QUFFcEU7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBRUYsU0FBZ0IsWUFBWSxDQUFDLFNBQWM7SUFDdkMsT0FBTztRQUNIO1lBQ0ksS0FBSyxFQUFFLHlCQUF5QjtZQUNoQyxLQUFLO2dCQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ3pDLENBQUM7cUJBQU0sQ0FBQztvQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFFRCx1QkFBdUI7QUFDdkIsU0FBZ0IsV0FBVyxDQUFDLFNBQWM7SUFDdEMsb0NBQW9DO0lBQ3BDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0NBQWdDO0lBQ2hDLE1BQU0sR0FBRyxHQUFHLElBQUEsY0FBTyxFQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXBFLGdDQUFnQztJQUNoQyxJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUUsQ0FBQztRQUN4QixPQUFPO1lBQ0g7Z0JBQ0ksS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsS0FBSztvQkFDRCxpQ0FBaUM7b0JBQ2pDLCtDQUErQztvQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ25FLENBQUM7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsT0FBTyxFQUFFLENBQUM7SUFFViwwQkFBMEI7SUFDMUIsOERBQThEO0lBQzlELGtDQUFrQztJQUdsQyxlQUFlO0lBQ2YsWUFBWTtJQUNaLGtEQUFrRDtJQUNsRCx3QkFBd0I7SUFDeEIsMERBQTBEO0lBQzFELHNEQUFzRDtJQUN0RCxrRkFBa0Y7SUFDbEYsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsSUFBSTtJQUNKLGFBQWE7SUFFYixXQUFXO0lBQ1gsUUFBUTtJQUNSLHdDQUF3QztJQUN4Qyx1QkFBdUI7SUFDdkIscURBQXFEO0lBQ3JELGVBQWU7SUFDZixxQ0FBcUM7SUFDckMsb0JBQW9CO0lBQ3BCLHNEQUFzRDtJQUN0RCxrREFBa0Q7SUFDbEQsOEVBQThFO0lBQzlFLGFBQWE7SUFDYixRQUFRO0lBRVIsTUFBTTtBQUNWLENBQUM7QUFDRCxTQUFnQixRQUFRLENBQUMsU0FBYztJQUNuQyxPQUFPO1FBQ0g7WUFDSSxLQUFLLEVBQUcsY0FBYztZQUN0QixLQUFLO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNwQyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQUNELFNBQWdCLFdBQVcsQ0FBQyxTQUFjO0lBQ3RDLE9BQU87UUFDRjtZQUNHLEtBQUssRUFBRyxpQkFBaUI7WUFDekIsS0FBSztnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdkMsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqb2luLCBleHRuYW1lIH0gZnJvbSAncGF0aCc7XG4vLyBpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnOyAvLyDsoITssrTrpbwg6rCA7KC47JmA7IScIHBhdGguam9pbigpIOyLneycvOuhnCDsjajrj4Qg65Cp64uI64ukLlxuXG4vKiogWyBhc3NldEluZm8gXSBcbiAgICBkaXNwbGF5TmFtZTogJycsXG4gICAgZXh0ZW5kczogW10sXG4gICAgaW1wb3J0ZXI6ICcqJyxcbiAgICBpc0RpcmVjdG9yeTogZmFsc2UsXG4gICAgaW5zdGFudGlhdGlvbjogdW5kZWZpbmVkLFxuICAgIGltcG9ydGVkOiB0cnVlLFxuICAgIGludmFsaWQ6IGZhbHNlLFxuICAgIG5hbWU6ICdQVV9Qb3BDdWJlUnN0b25lVUkuRXhwb3J0SnNvbicsXG4gICAgZmlsZTogJy9Vc2Vycy9jc3dxMzI3L2NvY29zX3Byb2plY3QvdGVzdF9wcm9qZWN0XzAxL2Fzc2V0cy9sZWdhY3lfanNvbi9QVV9Qb3BDdWJlUnN0b25lVUkuRXhwb3J0SnNvbicsXG4gICAgcmVkaXJlY3Q6IHVuZGVmaW5lZCxcbiAgICByZWFkb25seTogZmFsc2UsXG4gICAgdHlwZTogJ2NjLkFzc2V0JyxcbiAgICB1cmw6ICdkYjovL2Fzc2V0cy9sZWdhY3lfanNvbi9QVV9Qb3BDdWJlUnN0b25lVUkuRXhwb3J0SnNvbicsXG4gICAgdXVpZDogJzc1YzllZWNhLWYxNDQtNGJkOC1hYzg0LWE0NTBlM2VlNGE1NSdcbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNyZWF0ZU1lbnUoYXNzZXRJbmZvOiBhbnkpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogXCJpbXBvcnQtbGVnYWN5LXRvLXByZWZhYlwiLFxuICAgICAgICAgICAgY2xpY2soKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhc3NldEluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+2XpOuNlCDrqZTribTsl5DshJwg7IOd7ISxIOuqheugueydhCDrsJvslZjsirXri4jri6QuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+uUlOugie2GoOumrCDsnpDsgrAg7IOB7IS4IOygleuztDonLCBhc3NldEluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgXTtcbn1cblxuLy8g64KY66i47KeAIOuplOuJtCDtlajsiJjrk6Trj4Qg7ZWE7JqU7ZWY64uk66m0IOygleydmFxuZXhwb3J0IGZ1bmN0aW9uIG9uQXNzZXRNZW51KGFzc2V0SW5mbzogYW55KSB7IFxuICAgIC8vIDEuIOuwqeyWtCDsvZTrk5w6IGFzc2V0SW5mb+qwgCDsoJzrjIDroZwg64SY7Ja07Jik64qU7KeAIO2ZleyduFxuICAgIGlmICghYXNzZXRJbmZvIHx8ICFhc3NldEluZm8uZmlsZSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gMi4gbmFtZSDsho3shLHsnbTrgpggZmlsZSDqsr3roZzsl5DshJwg7ZmV7J6l7J6QIOy2lOy2nFxuICAgIGNvbnN0IGV4dCA9IGV4dG5hbWUoYXNzZXRJbmZvLm5hbWUgfHwgYXNzZXRJbmZvLmZpbGUpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyAzLiAuRXhwb3J0SnNvbiDtjIzsnbzsnbgg6rK97Jqw7JeQ66eMIOuplOuJtCDrhbjstpxcbiAgICBpZiAoZXh0ID09PSAnLmV4cG9ydGpzb24nKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiTGVnYWN5IC0+IFByZWZhYiDrs4DtmZhcIixcbiAgICAgICAgICAgICAgICBjbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g66mU7J24IO2UhOuhnOyEuOyKpChtYWluLnRzKeuhnCBhc3NldEluZm8g7KCE64usXG4gICAgICAgICAgICAgICAgICAgIC8vIG1haW4udHPsl5DshJzrj4Qg7J207KCcIGFzc2V0SW5mby5maWxl7J2EIO2Gte2VtCDqsr3roZzrpbwg7J296rKMIOuQqeuLiOuLpC5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTl0gZmlsZSBvbmNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5zZW5kKCdhc3NldC10ZXN0JywgJ2V4ZWN1dGUtaW1wb3J0JywgYXNzZXRJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuXG4gICAgLy8gLy8gRXhwb3J0SnNvbiDsnbzrlYzrp4wg66mU64m0IO2YuOy2nFxuICAgIC8vIGlmKCBhc3NldEluZm8gJiYgYXNzZXRJbmZvLnBhdGguZW5kc1dpdGgoJy5FeHBvcnRKc29uJykgKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coIGFzc2V0SW5mbyApO1xuICAgIFxuICAgICAgICBcbiAgICAvLyAgICAgcmV0dXJuIFtcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBsYWJlbDogXCJbY3VzdG9tXSBsZWdhY3kgdG8gcHJlZmFiXCIsXG4gICAgLy8gICAgICAgICAgICAgY2xpY2soKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOuplOyduCDtlITroZzshLjsiqTsl5Ag7KCV7J2Y65CcICdleGVjdXRlLWltcG9ydCcg66mU7Iuc7KeAIO2YuOy2nFxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uY2xpY2sgT25Bc3NldE1lbnVcIik7XG4gICAgLy8gICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnNlbmQoJ2Fzc2V0LXRlc3QnLCAnZXhlY3V0ZS1pbXBvcnQnLCBhc3NldEluZm8pO1xuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICBdO1xuICAgIC8vIH1cbiAgICAvLyByZXR1cm4gW107XG5cbiAgICAvLyByZXR1cm4gW1xuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICAvLyBsYWJlbCA6IFwidGVzdC1hc3NldC1tZW51XCIsXG4gICAgLy8gICAgICAgICAvLyBjbGljaygpIHtcbiAgICAvLyAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIu2BtOumrSB0ZXN0LWFzc2V0LW1lbnUgXCIpO1xuICAgIC8vICAgICAgICAgLy8gfVxuICAgIC8vICAgICAgICAgbGFiZWw6IFwibGVnYWN5IHRvIHByZWZhYlwiLFxuICAgIC8vICAgICAgICAgY2xpY2soKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8g66mU7J24IO2UhOuhnOyEuOyKpOyXkCDsoJXsnZjrkJwgJ2V4ZWN1dGUtaW1wb3J0JyDrqZTsi5zsp4Ag7Zi47LacXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbmNsaWNrIE9uQXNzZXRNZW51XCIpO1xuICAgIC8vICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnNlbmQoJ2Fzc2V0LXRlc3QnLCAnZXhlY3V0ZS1pbXBvcnQnLCBhc3NldEluZm8pO1xuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgfVxuICAgICAgICBcbiAgICAvLyBdOyBcbn1cbmV4cG9ydCBmdW5jdGlvbiBvbkRCTWVudShhc3NldEluZm86IGFueSkgeyBcbiAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbCA6IFwidGVzdC1kYi1tZW51XCIsXG4gICAgICAgICAgICBjbGljaygpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIu2BtOumrSB0ZXN0LWRiLW1lbnUgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTsgXG59XG5leHBvcnQgZnVuY3Rpb24gb25QYW5lbE1lbnUoYXNzZXRJbmZvOiBhbnkpIHsgXG4gICAgcmV0dXJuIFtcbiAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsIDogXCJ0ZXN0LXBhbmVsLW1lbnVcIixcbiAgICAgICAgICAgIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7YG066atIHRlc3QtcGFuZWwtbWVudSBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdOyBcbn0iXX0=