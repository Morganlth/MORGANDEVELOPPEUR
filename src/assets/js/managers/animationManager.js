// #ANIMATION-MANAGER

class AnimationManager
{
// #VARIABLES

    // --CONTEXT-ANIMATION
    animation_MANAGER = []
    animation_START = false

// #FUNCTIONS

    // --SET
    animation_set()
    {
        if (!this.animation_START)
            this.animation_START = true,
            this.animation_loop()
    }

    // --LOOP
    animation_loop()
    {
        for (let i = 0; i < this.animation_MANAGER.length; i++) this.animation_MANAGER[i]()

        requestAnimationFrame(this.animation_loop.bind(this))
    }

    // --UTILS
    animation_add(func) { if (this.animation_contain(func) === -1) this.animation_MANAGER.push(func) }

    animation_remove(func)
    {
        const INDEX = this.animation_contain(func)

        if (INDEX === -1) return

        this.animation_MANAGER.splice(INDEX, 1)
    }

    animation_contain(func) { return this.animation_MANAGER.indexOf(func) }
}

// #EXPORT

    // --CONTEXT
    export default new AnimationManager()