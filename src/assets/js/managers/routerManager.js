// #ROUTER-MANAGER

class RouterManager
{
    // #VARIABLES

        // --CONTEXT-ROUTER
        router_TITLE = 'LE THUAUT MORGAN - Développeur Web'
        router_LAST = +new Date()
        router_TIMEOUT = null
        router_PAGES = []

    // #FUNCTIONS

        // --SET
        router_set(id)
        {
            this.router_setPage(id)

            this.router_setEvent()
        }

        router_setEvent() { event.event_add('scroll', this.router_scroll.bind(this) )}

        router_setPage(id)
        {
            const PAGE = this.router_PAGES[id]
        
            event.event_scrollTo(PAGE.start)

            if (PAGE.call) setTimeout(PAGE.call, 100)
        }

        router_setSubPath(id, subPath)
        {
            this.router_PAGES[id].subPath = subPath ? '/' + subPath : undefined

            document.title = subPath ? subPath.toUpperCase() : this.router_TITLE
        }

        // --UPDATES
        router_update()
        {
            const PAGES = this.router_PAGES

            for (let i = PAGES.length - 1; i >= 0; i--)
                if (PAGES[i].start <= event.main_scrollTop) return history.pushState({}, '', location.origin + '/' + PAGES[i].name + (PAGES[i].subPath ?? ''))
        }

        router_updatePageStart(id, start) { this.router_PAGES[id].start = start }

        // --DESTROY
        router_destroy() { event.event_remove('scroll', this.router_scroll.bind(this)) }

        // --EVENT
        async router_scroll()
        {
            const NOW = +new Date()

            clearTimeout(this.router_TIMEOUT)

            if (NOW > this.router_LAST + 1000)
            {
                this.router_LAST = NOW

                this.router_update.call(this)
            }
            else this.router_TIMEOUT = setTimeout(this.router_update.bind(this), 1000)
        }

        // --UTIL
        router_add(id, name, start, call) { this.router_PAGES[id] = { name: name, start: start, call: call } }
}

// #IMPORT

    // --CONTEXT
    import event from './eventManager'

// #EXPORT

    // --CONTEXT
    export default new RouterManager()