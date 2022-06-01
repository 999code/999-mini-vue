
import pkg from "./package.json"
import typescript from "@rollup/plugin-typescript";

export default {
    input: 'src/index.ts', 
    output: [
        // cjs->commonjs
        // esm->es module
        {
            format:'cjs',
            file:pkg.main    
        },
        {
            format:'esm',
            file:pkg.module    
        }
    ],
    plugins: [typescript()]
}

