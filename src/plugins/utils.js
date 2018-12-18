var utils = {
    valid: function(field, type){
            switch (type) {
                case 1:
                    if(field === '') {
                        return '该字段不能为空'
                    } else if(!/^[0-9a-zA-Z]*$/.test(field)){
                        return '该字段必须为字母或数字'
                    } else {
                        return ''
                    }
                case 2:
                    if(field === '') {
                        return '该字段不能为空'
                    } else {
                        return ''
                    }
                default:
                    break;
            }
        }
} 

export default utils;

