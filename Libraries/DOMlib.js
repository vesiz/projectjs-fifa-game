var DOMlib = {

    get : function(_elementId){
        return document.getElementById(_elementId);
    },

    getAll : function(_input){
        return document.querySelectorAll(_input);
    },
    
    addChildWithId : function(_parent, _childType, _childId, _content){
        var parent = this.get(_parent);
        var newChild = document.createElement(_childType);
        var newContent = document.createTextNode("");

        if(_content != undefined){
            newContent =  document.createTextNode(_content);
        }

        newChild.setAttribute("id", _childId);
        newChild.appendChild(newContent);
        parent.appendChild(newChild);

        return newChild;
    },

    addChildWithClass : function(_parent, _childType, _childClass, _content){
        var parent = this.get(_parent);
        var newChild = document.createElement(_childType);
        var newContent = document.createTextNode("");

        if(_content != undefined){
            newContent =  document.createTextNode(_content);
        }

        newChild.setAttribute("class", _childClass);
        newChild.appendChild(newContent);
        parent.appendChild(newChild);

        return newChild;
    },

    removeElement : function(_elementId){
        var parent = document.getElementById(_elementId).parentNode;
        var element = document.getElementById(_elementId);
        parent.removeChild(element);
    },

    changeElementAttr : function(_elementId, _attrType, _attrValue){
        var element = document.getElementById(_elementId);

        if(typeof _attrValue == "object"){
            var styleString = "";

            for(var property in _attrValue){
                styleString += property + ": " + _attrValue[property] + "; ";
            }

            element.style = styleString;
        }
        else{
            element.setAttribute(_attrType, _attrValue);    
        }

        return element;
        
    },

    changeInnerHTML : function(_elementId, value){
        var element = document.getElementById(_elementId);
        element.innerHTML = value;

        return element;
    },

    changeInnerText : function(_elementId, value){
        var element = document.getElementById(_elementId);
        element.innerText = value;

        return element.innerText;
    },

    getParent : function(_elementId){
        return document.getElementById(_elementId).parentElement;
    },

    getPreviousSibling : function(_elementId){
        return document.getElementById(_elementId).previousElementSibling;
    },

    getNextSibling : function(_elementId){
        return document.getElementById(_elementId).nextElementSibling;
    },

    getAllChildren : function(_elementId){
        return document.getElementById(_elementId).children;
    },

    addEvent: function (_element, _event, _callback) {
        return document.getElementById(_element).addEventListener(_event, _callback);
    }

};



