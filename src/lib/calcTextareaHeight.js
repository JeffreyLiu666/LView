
const HIDDEN_TEXTAREA_STYLE = `
    height:0 !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important
`;

const SIZING_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing',
];

let hiddenTextarea;

function calculateNodeStyling(node) {

    const style = window.getComputedStyle(node);

    const boxSizing = (
        style.getPropertyValue('box-sizing') ||
        style.getPropertyValue('-moz-box-sizing') ||
        style.getPropertyValue('-webkit-box-sizing')
    );

    const paddingSize = (
        parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'))
    );

    const borderSize = (
        parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'))
    );

    const sizingStyle = SIZING_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');

    const nodeInfo = {
        sizingStyle,
        paddingSize,
        borderSize,
        boxSizing,
    };

    return nodeInfo;
}

function destroy () {
    if (!hiddenTextarea) return
    hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
    hiddenTextarea = null
}

function calcTextareaHeight(uiTextNode, minRows = 1, maxRows = null) {
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    if (uiTextNode.getAttribute('wrap')) {
        hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
    } else {
        hiddenTextarea.removeAttribute('wrap');
    }

    let {
        paddingSize, borderSize,
        boxSizing, sizingStyle,
    } = calculateNodeStyling(uiTextNode);

    hiddenTextarea.setAttribute('style', `${ sizingStyle };${ HIDDEN_TEXTAREA_STYLE }`)
    hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

    let height = hiddenTextarea.scrollHeight
    let overflowY, minHeight, maxHeight

    // 根据boxSizing获取style的height
    // scrollHeight是不包含borderSize的，但是包含paddingSize
    if (boxSizing === 'border-box') {
        height = height + borderSize
    }
    else if (boxSizing === 'content-box') {
        height = height - paddingSize
    }

    hiddenTextarea.value = ''
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

    if (minRows) {
        minHeight = singleRowHeight * minRows
        if (boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize
        }
        height = Math.max(height, minHeight)
        minHeight = `${ minHeight }px`
    }

    if (maxRows) {
        maxHeight = singleRowHeight * maxRows
        if (boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize
        }
        overflowY = height > maxHeight ? null : 'hidden'
        height = Math.min(height, maxHeight)
        maxHeight = `${ maxHeight }px`
    }

    if (!maxRows) {
        overflowY = 'hidden'
    }

    return {
        height: `${ height }px`,
        minHeight,
        maxHeight,
        overflowY // 使用overflowY防止闪动
    }
}

export default {
    destroy,
    calcTextareaHeight
}
