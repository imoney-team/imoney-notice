import "./style.css"
let options = {
    alertTime: 3,
    overlayClickDismiss: true,
    overlayOpacity: 0.75,
    transitionCurve: 'ease',
    transitionDuration: 0.3,
    transitionSelector: 'all',
    classes: {
        container: 'ui-notice-container',
        textbox: 'ui-notice-textbox',
        textboxInner: 'ui-notice-textbox-inner',

        button: 'ui-notice-button',
        element: 'ui-notice-element',
        elementHalf: 'ui-notice-element-half',
        elementThird: 'ui-notice-element-third',

        overlay: 'ui-notice-overlay',
        backgroundSuccess: 'ui-notice-success',
        backgroundWarning: 'ui-notice-warning',
        backgroundError: 'ui-notice-error',
        backgroundInfo: 'ui-notice-info',
        backgroundNeutral: 'ui-notice-neutral',
        backgroundOverlay: 'ui-notice-overlay',

        alert: 'ui-notice-alert',
    },
    ids: {
        overlay: 'ui-notice-overlay'
    }
}

export const setOptions = newOptions => {
    options = {
        ...options,
        ...newOptions,
        classes: {...options.classes, ...newOptions.classes},
        ids: {...options.ids, ...newOptions.ids},
        positions: {...options.positions, ...newOptions.positions}
    }
}

// ====================
// helpers
// ====================

const tick = () => new Promise(resolve => setTimeout(resolve, 0))
const wait = time => new Promise(resolve => setTimeout(resolve, time * 1000))

const blur = () => {
    document.activeElement && document.activeElement.blur()
}

const generateRandomId = () => {
    // RFC4122 version 4 compliant UUID
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
    return `ui-notice-${id}`
}

const typeToClassLookup = {
    1: options.classes.backgroundSuccess,
    success: options.classes.backgroundSuccess,
    2: options.classes.backgroundWarning,
    warning: options.classes.backgroundWarning,
    3: options.classes.backgroundError,
    error: options.classes.backgroundError,
    4: options.classes.backgroundInfo,
    info: options.classes.backgroundInfo,
    5: options.classes.backgroundNeutral,
    neutral: options.classes.backgroundNeutral
}

const getTransition = () => (
    `${options.transitionSelector} ${options.transitionDuration}s ${options.transitionCurve}`
)

const enterClicked = event => event.keyCode === 13
const escapeClicked = event => event.keyCode === 27

const addToDocument = (element) => {
    element.classList.add(options.classes.container)
    document.body.appendChild(element)

    if (element.listener) window.addEventListener('keydown', element.listener)

    tick().then(() => {
        element.style.transition = getTransition()
    })
}

const removeFromDocument = (id) => {
    const element = document.getElementById(id)
    if (!element) return

    if (element.listener) window.removeEventListener('keydown', element.listener)

    wait(options.transitionDuration).then(() => {
        if (element.parentNode) element.parentNode.removeChild(element)
    })
}

const addOverlayToDocument = (owner) => {
    const element = document.createElement('div')
    element.id = options.ids.overlay
    element.classList.add(options.classes.overlay)
    element.classList.add(options.classes.backgroundOverlay)
    element.style.opacity = 0
    if (owner && options.overlayClickDismiss) {
        element.onclick = () => {
            removeFromDocument(owner.id)
            removeOverlayFromDocument()
        }
    }

    document.body.appendChild(element)

    tick().then(() => {
        element.style.transition = getTransition()
        element.style.opacity = options.overlayOpacity
    })
}

const removeOverlayFromDocument = () => {
    const element = document.getElementById(options.ids.overlay)
    element.style.opacity = 0
    wait(options.transitionDuration).then(() => {
        if (element.parentNode) element.parentNode.removeChild(element)
    })
}

export const hideAlerts = callback => {
    const alertsShowing = document.getElementsByClassName(options.classes.alert)
    if (alertsShowing.length) {
        for (let i = 0; i < alertsShowing.length; i++) {
            const alert = alertsShowing[i]
            removeFromDocument(alert.id, alert.position)
        }
        if (callback) wait(options.transitionDuration).then(() => callback())
    }
}

// ====================
// exports
// ====================

export const alert = ({
                          type = 4,
                          text,
                          time = options.alertTime,
                          stay = false,
                      }) => {
    blur()
    hideAlerts()

    const element = document.createElement('div')
    const id = generateRandomId()
    element.id = id
    element.classList.add(options.classes.textbox)
    element.classList.add(typeToClassLookup[type])
    element.classList.add(options.classes.alert)
    element.innerHTML = `<div class="${options.classes.textboxInner}">${text}</div>`
    element.onclick = () => removeFromDocument(id)

    element.listener = event => {
        if (enterClicked(event) || escapeClicked(event)) hideAlerts()
    }

    addToDocument(element)
    if (time && time < 1) time = 1
    if (!stay && time) wait(time).then(() => removeFromDocument(id))
}

export const force = ({
                          type = 5,
                          text,
                          buttonText = 'OK',
                          callback,
                      }, callbackArg) => {
    blur()
    hideAlerts()

    const element = document.createElement('div')
    const id = generateRandomId()
    element.id = id

    const elementText = document.createElement('div')
    elementText.classList.add(options.classes.textbox)
    elementText.classList.add(options.classes.backgroundInfo)
    elementText.innerHTML = `<div class="${options.classes.textboxInner}">${text}</div>`

    const elementButton = document.createElement('div')
    elementButton.classList.add(options.classes.button)
    elementButton.classList.add(typeToClassLookup[type])
    elementButton.innerHTML = buttonText
    elementButton.onclick = () => {
        removeFromDocument(id)
        removeOverlayFromDocument()
        if (callback) callback()
        else if (callbackArg) callbackArg()
    }

    element.appendChild(elementText)
    element.appendChild(elementButton)

    element.listener = event => {
        if (enterClicked(event)) elementButton.click()
    }

    addToDocument(element)

    addOverlayToDocument()
}

export const confirm = ({
                            text,
                            submitText = 'Yes',
                            cancelText = 'Cancel',
                            submitCallback,
                            cancelCallback,
                        }, submitCallbackArg, cancelCallbackArg) => {
    blur()
    hideAlerts()

    const element = document.createElement('div')
    const id = generateRandomId()
    element.id = id

    const elementText = document.createElement('div')
    elementText.classList.add(options.classes.textbox)
    elementText.classList.add(options.classes.backgroundInfo)
    elementText.innerHTML = `<div class="${options.classes.textboxInner}">${text}</div>`

    const elementButtonLeft = document.createElement('div')
    elementButtonLeft.classList.add(options.classes.button)
    elementButtonLeft.classList.add(options.classes.elementHalf)
    elementButtonLeft.classList.add(options.classes.backgroundSuccess)
    elementButtonLeft.innerHTML = submitText
    elementButtonLeft.onclick = () => {
        removeFromDocument(id)
        removeOverlayFromDocument()
        if (submitCallback) submitCallback()
        else if (submitCallbackArg) submitCallbackArg()
    }

    const elementButtonRight = document.createElement('div')
    elementButtonRight.classList.add(options.classes.button)
    elementButtonRight.classList.add(options.classes.elementHalf)
    elementButtonRight.classList.add(options.classes.backgroundError)
    elementButtonRight.innerHTML = cancelText
    elementButtonRight.onclick = () => {
        removeFromDocument(id)
        removeOverlayFromDocument()
        if (cancelCallback) cancelCallback()
        else if (cancelCallbackArg) cancelCallbackArg()
    }

    element.appendChild(elementText)
    element.appendChild(elementButtonLeft)
    element.appendChild(elementButtonRight)

    element.listener = event => {
        if (enterClicked(event)) elementButtonLeft.click()
        else if (escapeClicked(event)) elementButtonRight.click()
    }

    addToDocument(element)

    addOverlayToDocument(element)
}

export default {
    alert,
    force,
    confirm,
    setOptions,
    hideAlerts
}
