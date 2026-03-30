import { _decorator, Component, Node } from 'cc';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestCurveBezier')
export class TestCurveBezier extends Component {
    start() {
        this.reverseEngineDataToHermiteTanget("[linear] " , 1, 0.42426406871192845, 1.0000000000000002, 0.4242640687119285);
 
        this.reverseEngineDataToHermiteTanget("[cubicIn] " , 0 , 0.4, 1, 0.7071067811865475);
        this.reverseEngineDataToHermiteTanget("[quadIn]  " , 0.14545454545454545 ,  0.5557877292636102, 1.4687500000000002, 0.5685947590331799);
        this.reverseEngineDataToHermiteTanget("[quartIn] " , 0.033707865168539325 ,  0.8905054744357275, 2.4687500000000004, 0.8523496934944013);
        this.reverseEngineDataToHermiteTanget("[quintIn] " , 0.06666666666666667, 0.7516648189186454, 6.266666666666667, 0.9518928511129809);
        this.reverseEngineDataToHermiteTanget("[sineIn]  " , 0 , 0.4799999999999999, 1.074074074074074, 0.39623225512317906);
        this.reverseEngineDataToHermiteTanget("[expoIn]  " , 0.04210526315789474 , 0.9508417323613851, 4.619047619047621, 0.9924716620639605);
        this.reverseEngineDataToHermiteTanget("[circIn]  " , 0.06666666666666667 , 0.6013318551349163, 33.499999999999915, 0.6702984409947566);

        this.reverseEngineDataToHermiteTanget("[cubicOut] ", 2.0000000000000004 , 0.1341640786499874, 0, 0.42000000000000004);
        this.reverseEngineDataToHermiteTanget("[quadOut]  ", 1.84 , 0.5235456045083371, 0.09090909090909098,  0.552268050859363);
        this.reverseEngineDataToHermiteTanget("[quartOut] ", 5.25 , 0.8551023330572781, 0, 0.5700000000000001);
        this.reverseEngineDataToHermiteTanget("[quintOut] ", 4.545454545454546, 1.023914058893617, 0, 0.69);
        this.reverseEngineDataToHermiteTanget("[sineOut]  ", 1.5128205128205128 , 0.707248188403477, 0, 0.44);
        this.reverseEngineDataToHermiteTanget("[expoOut]  ", 5.555555555555555 , 1.0160708636704427, 0, 0.7799999999999999);
        this.reverseEngineDataToHermiteTanget("[circOut]  ", 10.25 , 0.8238931969618398, 0, 0.99);

        this.reverseEngineDataToHermiteTanget("[cubicInOut] ", 0 , 0.42, 0, 0.42000000000000004);
        this.reverseEngineDataToHermiteTanget("[quadInOut]  ", 0.08333333333333334 , 0.4816637831516917, 0.08333333333333343, 0.4816637831516918);
        this.reverseEngineDataToHermiteTanget("[quartInOut] ", 0 , 0.83, 0, 0.83);
        this.reverseEngineDataToHermiteTanget("[quintInOut] ", 0, 0.94, 0, 0.94);
        this.reverseEngineDataToHermiteTanget("[sineInOut]  ", 0.10869565217391304 , 0.46270941205037097,  0.10869565217391317, 0.46270941205037086);
        this.reverseEngineDataToHermiteTanget("[expoInOut]  ", 0, 1, 0, 1);
        this.reverseEngineDataToHermiteTanget("[circInOut]  ", 0.16279069767441862, 0.8713208364316787, 0.16279069767441862,  0.8713208364316787);

        this.getHermiteTangetByEasingType(
           "linear",
            0.2999999999999999 , 0.2999999999999999, 0.7000000000000001, 0.7,
            0 , 1, 0, 1,
        )   
        this.getHermiteTangetByEasingType(
           "linear",
            0 , 0, 1, 1,
            0 , 1, 0, 1,
        )   
        // [[sineIn] ]Bezier [0.4799999999999999 , 0, 0.7299999999999999, 0.71]
        // [[sineOut] ]Bezier [0.39 , 0.59, 0.56, 1]
        // [[sineInOut] ]Bezier [0.45999999999999996 , 0.049999999999999996, 0.5400000000000003, 0.95]
    
        // [[quadIn] ]Bezier [0.55 , 0.08, 0.68, 0.53]
        // [[quadOut] ]Bezier [0.25000000000000006 , 0.46000000000000013, 0.4500000000000002, 0.95]
        // [[quadInOut] ]Bezier [0.48 , 0.04, 0.52, 0.96]
        
        // [[cubicIn] ]Bezier [0.4000000000000001 , 0, 0.5000000000000001, 0.5000000000000002]
        // [[cubicOut] ]Bezier [0.05999999999999999 , 0.12000000000000001, 0.5799999999999998, 1]
        // [[cubicInOut] ]Bezier [0.42 , 0, 0.5799999999999998, 1]
        
        // [[quartIn] ]Bezier [0.8900000000000002 , 0.03000000000000001, 0.6800000000000002, 0.21000000000000008]
        // [[quartOut] ]Bezier [0.16000000000000003 , 0.8400000000000002, 0.42999999999999994, 1]
        // [[quartInOut] ]Bezier [0.83 , 0, 0.17000000000000004, 1]
        
        // [[quintIn] ]Bezier [0.7499999999999999 , 0.04999999999999999, 0.8500000000000001, 0.060000000000000164]
        // [[quintOut] ]Bezier [0.22000000000000014 , 1.0000000000000007, 0.31000000000000005, 1]
        // [[quintInOut] ]Bezier [0.94 , 0, 0.06000000000000005, 1]
        
        // [[expoIn] ]Bezier [0.95 , 0.04, 0.79, 0.029999999999999916]
        // [[expoOut] ]Bezier [0.17999999999999994 , 0.9999999999999997, 0.22000000000000008, 1]
        // [[expoInOut] ]Bezier [1 , 0, 0, 1]
        
        // [[circIn] ]Bezier [0.5999999999999999 , 0.039999999999999994, 0.9799999999999999, 0.3299999999999992]
        // [[circOut] ]Bezier [0.08000000000000007 , 0.8200000000000007, 0.01000000000000012, 1]
        // [[circInOut] ]Bezier [0.8600000000000001 , 0.14, 0.1399999999999999, 0.86]
        
        // [[linear] ]Bezier [0.2999999999999999 , 0.2999999999999999, 0.7000000000000001, 0.7]
        
        // // 0.48, 0, 0.73, 0.71 [tanget] right :[0 , 0.48] left : [1.0740740740740742, 0.396232255123179]
        // this.getHermiteTangetByEasingType(
        //     0, 1, 0, 1,            
        //     1 , 0, 0, 1,
        // )
        //0~50 
        //1       
        // "rightTangent": 2.1052631578947367,
        // "rightTangentWeight": 2.2141589825484527,
        // "leftTangent": 230.95238095238105,
        // "leftTangentWeight": 48.5004546370453,

        //0.5
        // "rightTangent": 4.2105263157894735,
        // "rightTangentWeight": 2.055632506067171,
        // "leftTangent": 461.9047619047621,
        // "leftTangentWeight": 48.50011365965935,

        // 0, 0.48, 1.074, 0.396 [0.48 , 0, 0.7301482940598489, 0.7101792678202777]
        //expo_easeInOut
        //[EXPO_EASEIN]Bezier [0.9499992787945841 , 0.03999971963364596, 0.7899999735524522, 0.03000000783753365]
                            //  [0.95 , 0.04, 0.7900000000000001, 0.029999999999999916]
        // this.reverseEngineDataToBezier(
        //     "EXPO_EASEIN",
        //     0.042105, 0.950841, 4.619047, 0.99247166,
        // )
        // //[EXPO_EASEOUT]Bezier [0.18000000174351025 , 0.9999999996861679, 0.22000000000000008, 1]
        // this.reverseEngineDataToBezier(
        //     "EXPO_EASEOUT",
        //     5.5555555, 1.0160708636704427, 0, 0.7799999999999999,
        // )
        // //[EXPO_EASEINOUT]Bezier [1 , 0, 0, 1]
        // this.reverseEngineDataToBezier(
        //     "EXPO_EASEINOUT",
        //     0, 1, 0, 1,
        // );

        // this.reverseEngineDataToBezier(
        //     "EXPO_EASEINOUT",
        //     0, 1, 0, 1,
        //     0, 1, 0, 1
        // );
        // this.reverseEngineDataToBezier(
        //     "EXPO_EASEINOUT",
        //     0, 0.5,  0, 0.5,
        //     0, 0.5,  0, 1
        // );
        // this.reverseEngineDataToBezier(
        //     "EXPO_EASEINOUT",
        //     0, 0.25,  0, 0.25,
        //     0, 0.25, 50, 0
        // );

        // this.getHermiteTangetByEasingType(
        //    "EXPO_EASEINOUT",
        //     1, 0, 0, 1,            
        //    0, 1, 0, 1
        // )   
        // this.getHermiteTangetByEasingType(
        //    "EXPO_EASEINOUT",
        //     1, 0, 0, 1,            
        //     0, 0.5,  0, 1
        // )       
        // this.getHermiteTangetByEasingType(
        //    "EXPO_EASEINOUT",
        //     1, 0, 0, 1,            
        //     0, 0.25, 50, 0
        // )     
    
                

        // //50, 0.25초
        // //right :[0 , 0.25] left : [0, 0.25]
        // this.getHermiteTangetByEasingType(
        //    "EXPO_EASEINOUT",
        //     1, 0, 0, 1,            
        //     0 , 0.25, 0, 50,
        // )   
        // this.getHermiteTangetByEasingType(
        //    "EXPO_EASEINOUT",
        //     1, 0, 0, 1,            
        //     0 , 1, 0, 0,
        // )     

        // this.reverseEngineDataToBezier(
        //    "1,EXPO_EASEIN",
        //     2.1052631578947367, 2.2141589825484527, 230.95238095238105,  48.5004546370453,            
        //     0 , 1, 0, 50,
        // )   
        // this.getHermiteTangetByEasingType(
        //    "1,EXPO_EASEIN",
        //     0.95 , 0.04, 0.79, 0.03,            
        //     0 , 1, 0, 50,
        // ) 
        // this.reverseEngineDataToBezier(
        //    "0.5EXPO_EASEIN",
        //     4.2105263157894735, 2.055632506067171, 461.9047619047621,  48.50011365965935,            
        //     0, 0.5, 0, 50,
        // )     
        // this.getHermiteTangetByEasingType(
        //    "1,EXPO_EASEIN",
        //     0.95 , 0.04, 0.79, 0.03,         
        //     0 ,0.5, 0, 50,
        // ) 
        // this.reverseEngineDataToBezier(
        //    "0.5EXPO_EASEIN _1",
        //     0.08421052631578949, 0.4766812352086035, 9.238095238095243,  0.9756664389021477,            
        //     0, 0.5, 0, 1,
        // )     
        // this.getHermiteTangetByEasingType(
        //    "1,EXPO_EASEIN",
        //     0.95 , 0.04, 0.79, 0.03,            
        //     0 , 0.5, 0, 1,
        // ) 
        // this.reverseEngineDataToBezier(
        //    "1 EXPO_EASEIN _1",
        //     0.04210526315789474, 0.9508417323613851, 4.619047619047621,   0.9924716620639605,            
        //     0, 1, 0, 1,
        // )
        // this.getHermiteTangetByEasingType(
        //    "1,EXPO_EASEIN",
        //     0.95 , 0.04, 0.79, 0.03,              
        //     0 , 1, 0, 1,
        // ) 
         const posValues: cc.Vec3[] = [ new cc.Vec3(1,2,3),new cc.Vec3(4,5,6),new cc.Vec3(7,8,9), new cc.Vec3(10,11,12) ];

        // TS가 똑똑해서 "x", "y", "z" 외에 "w" 같은 걸 넣으면 에러를 뿜어냅니다!
        const separatedPos = this.extractProperties(posValues, ["x", "y", "z"]);

        console.log(separatedPos[0]); // number[] : X축 값들만 쫙!
        console.log(separatedPos[1]); // number[] : Y축 값들만 쫙!
        console.log(separatedPos[2]); // number[] : Z축 값들만 쫙!
    }

    update(deltaTime: number) {

    }
    getHermiteTangetByEasingType(
        logTag :string,
        cx1:number,cy1:number, cx2:number, cy2:number, 
        time: number = 0,   nextTime: number = 1, 
        value: number = 0,  nextValue: number = 1,
    ) {

        const dt = nextTime - time;
        const dv = nextValue - value;
        const fx = 3 * dt;
        const fy = 3 * dv;
        const t1x = cx1 * fx;
        const t1y = cy1 * fy;
        const t2x = (1.0 - cx2) * fx;
        const t2y = (1.0 - cy2) * fy;
        const ONE_THIRD = 1.0 / 3.0;
        let previousTangent = 0;
        let previousTangentWeight = Number.EPSILON; 
        let nextTangent = 0;
        let nextTangentWeight = Number.EPSILON;
        if(t1y!== 0 && t1x !== 0){
            previousTangent = t1y / t1x;
            previousTangentWeight = Math.sqrt(t1x * t1x + t1y * t1y) * ONE_THIRD;
        }
         if(t2y !== 0 && t2x !== 0){      
            nextTangent = t2y / t2x;
            nextTangentWeight = Math.sqrt(t2x * t2x + t2y * t2y) * ONE_THIRD;
        }

        console.log(`[${logTag}] tanget right :[${previousTangent} , ${previousTangentWeight}] left : [${nextTangent}, ${nextTangentWeight}]`);
    }
    
    reverseEngineDataToHermiteTanget(
        logTag : string,

        rightTangent: number, 
        rightWeight: number,
        leftTangent: number, 
        leftWeight: number,
        time: number = 0, 
        nextTime: number = 1, 
        value: number = 0, 
        nextValue: number = 1,
    ): number[] {
        const dt = nextTime - time;
        const dv = nextValue - value;
    
        // 엔진 공식:
        // fx = 3 * dt; fy = 3 * dv;
        // t1x = p1x * fx; t1y = p1y * fy;
        // weight = Math.sqrt(t1x^2 + t1y^2) / 3;
        // tangent = t1y / t1x;
    
        const fx = 3 * dt;
        const fy = 3 * dv;
    
        // p1x 추출: (3*w)^2 = (p1x*fx)^2 + (p1x*fx*tan)^2
        // p1x = (3*w) / (fx * sqrt(1 + tan^2))
        const p1x = (3 * rightWeight) / (fx * Math.sqrt(1 + Math.pow(rightTangent, 2)));
        const p1y = (p1x * rightTangent * fx) / (fy || 0.00001); // dv가 0일 때 방어

        const p2x_dist = (3 * leftWeight) / (fx * Math.sqrt(1 + Math.pow(leftTangent, 2)));
        const p2y_dist = (p2x_dist * leftTangent * fx) / (fy || 0.00001);
    
        const p2x = 1 - p2x_dist;
        const p2y = 1 - p2y_dist;
    
        console.log(`[${logTag}]Bezier [${p1x} , ${p1y}, ${p2x}, ${p2y}]`);
          
        return [
            Number(p1x.toFixed(6)), 
            Number(p1y.toFixed(6)), 
            Number(p2x.toFixed(6)), 
            Number(p2y.toFixed(6))
        ];
    }

    extractProperties<T, K extends keyof T>(
        items: T[], 
        keys: K[]
    ): T[K][][] {
        
        const result :T[K][][] = [];
        for (let i = 0; i < keys.length; i++) {
            result.push([]);
        }

        // 3. 단일 루프로 데이터를 돌면서 각각의 배열에 값 분배 (성능 최적화)
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            for (let j = 0; j < keys.length; j++) {
                const key = keys[j];
                result[j].push(item[key]);
            }
        }

        return result;
    }

}


