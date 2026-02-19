/**
 * Renders retro terminal-style text content onto a canvas
 * Used to generate textures for the 3D world (replacing .ktx images)
 */
export class TerminalCanvasRenderer
{
    static BG_COLOR = '#050510'
    static PROMPT_COLOR = '#00ffaa'
    static HEADER_COLOR = '#ff7744'
    static META_COLOR = '#8888aa'
    static SECTION_COLOR = '#ffcc33'
    static POINT_COLOR = '#b8b8d8'
    static DIVIDER_COLOR = 'rgba(0, 255, 170, 0.25)'
    static CURSOR_COLOR = '#00ffaa'
    static FONT_FAMILY = "VT323, 'Courier New', monospace"

    static MARGIN_X = 40
    static MARGIN_TOP = 40
    static MARGIN_BOTTOM = 30

    /**
     * Build an array of drawable line objects from page content
     * Each line has: { text, font, color, alpha, x, y, type }
     */
    static buildLines(content, width, height)
    {
        const lines = []
        const mx = this.MARGIN_X
        let y = this.MARGIN_TOP
        const usableWidth = width - mx * 2 - 20

        // Temp canvas for text measurement
        const measure = document.createElement('canvas').getContext('2d')

        // ── Command prompt ──
        const promptFont = `400 18px ${this.FONT_FAMILY}`
        measure.font = promptFont
        lines.push({ text: '$ cat experience.log', font: promptFont, color: this.PROMPT_COLOR, alpha: 0.7, x: mx, y })
        y += 30

        // ── Header (role) ──
        if(content.header)
        {
            const font = `400 30px ${this.FONT_FAMILY}`
            measure.font = font
            const wrapped = this._wordWrap(measure, content.header, usableWidth)
            for(const line of wrapped)
            {
                lines.push({ text: line, font, color: this.HEADER_COLOR, alpha: 1, x: mx, y })
                y += 36
            }
            y += 4
        }

        // ── Subheader (company · date · location) ──
        if(content.subheader)
        {
            const font = `400 20px ${this.FONT_FAMILY}`
            measure.font = font
            lines.push({ text: content.subheader, font, color: this.META_COLOR, alpha: 1, x: mx, y })
            y += 28
        }

        // ── Divider ──
        y += 5
        lines.push({ type: 'divider', x: mx, y, width: width - mx * 2 })
        y += 15

        // ── Section title ──
        if(content.section)
        {
            const font = `400 22px ${this.FONT_FAMILY}`
            measure.font = font
            lines.push({ text: `[ ${content.section} ]`, font, color: this.SECTION_COLOR, alpha: 1, x: mx, y })
            y += 30
        }

        // ── Points ──
        if(content.points)
        {
            const font = `400 18px ${this.FONT_FAMILY}`
            measure.font = font

            for(const point of content.points)
            {
                const fullText = `> ${point}`
                const wrapped = this._wordWrap(measure, fullText, usableWidth)

                for(let i = 0; i < wrapped.length; i++)
                {
                    if(y > height - this.MARGIN_BOTTOM - 10) break
                    lines.push({ text: wrapped[i], font, color: this.POINT_COLOR, alpha: 1, x: mx + 8, y })
                    y += 22
                }
                y += 6
            }
        }

        // ── Cursor ──
        lines.push({ type: 'cursor', x: mx, y: Math.min(y + 8, height - this.MARGIN_BOTTOM) })

        return lines
    }

    /**
     * Draw the terminal background (dark + scanlines + vignette)
     */
    static drawBackground(canvas)
    {
        const ctx = canvas.getContext('2d')
        const w = canvas.width
        const h = canvas.height

        // Dark fill
        ctx.fillStyle = this.BG_COLOR
        ctx.fillRect(0, 0, w, h)

        // Scanline overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
        for(let sy = 0; sy < h; sy += 4)
        {
            ctx.fillRect(0, sy, w, 2)
        }

        // CRT vignette
        const r = Math.min(w, h) * 0.5
        const grad = ctx.createRadialGradient(w / 2, h / 2, r * 0.5, w / 2, h / 2, r * 1.4)
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)')
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
    }

    /**
     * Draw a single line on the canvas
     */
    static drawLine(canvas, lineData)
    {
        const ctx = canvas.getContext('2d')

        if(lineData.type === 'divider')
        {
            ctx.fillStyle = this.DIVIDER_COLOR
            ctx.fillRect(lineData.x, lineData.y, lineData.width, 1)
            return
        }

        if(lineData.type === 'cursor')
        {
            ctx.fillStyle = this.CURSOR_COLOR
            ctx.font = `400 18px ${this.FONT_FAMILY}`
            ctx.globalAlpha = 0.8
            ctx.fillText('\u2588', lineData.x, lineData.y)
            ctx.globalAlpha = 1
            return
        }

        ctx.font = lineData.font
        ctx.fillStyle = lineData.color
        ctx.globalAlpha = lineData.alpha ?? 1
        ctx.fillText(lineData.text, lineData.x, lineData.y)
        ctx.globalAlpha = 1
    }

    /**
     * Draw background + all lines
     */
    static drawAll(canvas, lines)
    {
        this.drawBackground(canvas)
        for(const line of lines)
        {
            this.drawLine(canvas, line)
        }
    }

    /**
     * Create a fully rendered canvas
     * @returns {{ canvas: HTMLCanvasElement, lines: Array }}
     */
    static render(content, width, height)
    {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const lines = this.buildLines(content, width, height)
        this.drawAll(canvas, lines)

        return { canvas, lines }
    }

    /**
     * Render a mini thumbnail canvas (for lab scroller)
     */
    static renderMini(content, width, height)
    {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        // Background
        ctx.fillStyle = this.BG_COLOR
        ctx.fillRect(0, 0, width, height)

        // Subtle scanlines
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
        for(let sy = 0; sy < height; sy += 3)
        {
            ctx.fillRect(0, sy, width, 1)
        }

        // Title
        ctx.font = `400 16px ${this.FONT_FAMILY}`
        ctx.fillStyle = this.HEADER_COLOR
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(content.title || '', width / 2, height / 2 - 10)

        // Subtitle (language / stars)
        if(content.subtitle)
        {
            ctx.font = `400 12px ${this.FONT_FAMILY}`
            ctx.fillStyle = this.META_COLOR
            ctx.fillText(content.subtitle, width / 2, height / 2 + 10)
        }

        return canvas
    }

    /**
     * Word-wrap text to fit within maxWidth
     * @private
     */
    static _wordWrap(ctx, text, maxWidth)
    {
        const words = text.split(' ')
        const result = []
        let current = ''

        for(const word of words)
        {
            const test = current ? `${current} ${word}` : word
            if(ctx.measureText(test).width > maxWidth && current)
            {
                result.push(current)
                current = `  ${word}` // indent continuation lines
            }
            else
            {
                current = test
            }
        }
        if(current) result.push(current)

        return result
    }
}
