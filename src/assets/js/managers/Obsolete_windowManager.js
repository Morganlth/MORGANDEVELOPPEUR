// #WINDOW-MANAGER

class WindowManager
{
    // #VARIABLES

        // --CONTEXT-WINDOW
        window_LAST = +new Date()
        window_TIMEOUT
        window_RESIZE
        window_MOBILE
        window_TOUCHSCREEN
        window_FORMAT

    // #CONSTRUCTOR

    constructor()
    {
        this.window_RESIZE = this.window_resize.bind(this)

        this.window_FORMAT = 'auto'
    }

    // #FUNCTIONS

        // --SET
        window_set()
        {
            this.window_MOBILE = this.window_testMobile()

            window.addEventListener('resize', this.window_RESIZE)

            this.window_setCommand()
        }

        window_setCommand() { app.app_add('format', this.window_format.bind(this))}

        // --GET
        window_getRatio() { return window.innerWidth / window.innerHeight }

        // --DESTROY
        window_destroy() { try { window.removeEventListener('resize', this.window_RESIZE) } catch {} }

        // --COMMAND
        window_format(value)
        {
            value = app.app_testDefault(value) ? 'auto' : this.window_testFormat(value)

            if (this.window_FORMAT !== value)
                this.window_FORMAT = value,
                this.window_call()

            localStorage.setItem('format', value)

            app.app_success('format - ' + value)
        }

        // --EVENT
        window_resize()
        {
            const now = +new Date()

            clearTimeout(this.window_TIMEOUT)

            now > this.window_LAST + 2000
            ? this.window_call(now)
            : this.window_TIMEOUT = setTimeout(this.window_call.bind(this), 500)
        }

        // --TESTS
        window_testMobile()
        {
            return (
                this.window_FORMAT === 'mobile'
                || this.window_FORMAT === 'auto'
                && (this.window_TOUCHSCREEN
                    || navigator.maxTouchPoints > 0 && /(Android|iPhone)/i.test(navigator.userAgent))
            )
        }

        window_testSmallScreen() { return window.innerWidth < 768 }

        window_testFormat(value)
        {
            return ['auto', 'mobile', 'desktop'].includes(value)
            ? value
            : app.app_error('La valeur doit être "auto", "mobile" ou "desktop"', 'TypeError')
        }

        // --UTIL
        window_call(now)
        {
            this.window_LAST = now ?? +new Date()
            this.window_MOBILE = this.window_testMobile()

            const SMALLSCREEN = this.window_testSmallScreen()

            tick().then(event.event_resize.bind(event, SMALLSCREEN))
        }
}

// #IMPORTS

    // --CONTEXTS
    import app from './appManager'
    import event from './eventManager'

    // --SVELTE
    import { tick } from 'svelte'

// #EXPORT

    // --CONTEXT
    export default new WindowManager()