import {h} from "../../lib/guide-mini-vue.esm.js"
export const Foo={
    setup(props,{emit}){
        // console.log(props);
        // props.count++
        // console.log(props);
        const emitAdd=()=>{
            emit('add',1,2)
            emit('add-foo')
            console.log('add');
        }
        return {
            emitAdd
        }
    },
    render() {
        // return h('div',{},'foo:'+this.count)
        const btn=h('button',{
            onClick:this.emitAdd,
        },'emitAdd')
        const foo=h('p',{},'foo')

        return h('div',{},[foo,btn])
    },

}
