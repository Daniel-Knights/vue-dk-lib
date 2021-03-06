<template>
    <button
        @click="toggle($event)"
        @mouseup="container.blur()"
        class="vt__burger-container"
        :style="styles"
        aria-label="toggle"
        tabindex="0"
        ref="container"
    >
        <div class="vt__burger" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </button>
</template>

<script>
import { onMounted, ref } from 'vue';
import rippleHandler from './js/ripple';

export default {
    name: 'Burger',

    props: {
        styles: { type: Object, default: {} },
        state: { type: Boolean, default: false },
        ripple: { type: Boolean, default: false },
        background: { type: String, default: '#47cab1' },
        hoverBackground: { type: String, default: '#6fd6c1' },
        stripColor: { type: String, default: '#ffffff' },
        stripHoverColor: { type: String, default: '#ffffff' },
    },

    setup(props, { emit }) {
        const container = ref(null);
        const open = ref(false);

        const toggle = e => {
            open.value = !open.value;
            container.value.classList.toggle('vt__burger-open');
            emit('open', open.value);

            if (props.ripple) rippleHandler(e, container.value);
        };
        const setColor = (property, color) => {
            container.value.style.setProperty(property, color);
        };

        onMounted(() => {
            setColor('--bg', props.background);
            setColor('--bg-hover', props.hoverBackground);
            setColor('--strips', props.stripColor);
            setColor('--strips-hover', props.stripHoverColor);

            // Safari ripple
            if (navigator.vendor.match(/apple/i) && props.ripple) {
                container.value.style.webkitMaskImage = 'radial-gradient(white, black)';
            }
        });

        return { container, open, toggle, setColor };
    },

    watch: {
        background(val) {
            this.setColor('--bg', val);
        },
        hoverBackground(val) {
            this.setColor('--bg-hover', val);
        },
        stripColor(val) {
            this.setColor('--strips', val);
        },
        stripHoverColor(val) {
            this.setColor('--strips-hover', val);
        },
        state(val) {
            if (!val) {
                this.open = false;
                this.container.classList.remove('vt__burger-open');
            } else {
                this.open = true;
                this.container.classList.add('vt__burger-open');
            }
        },
    },
};
</script>

<style lang="scss">
.vt__burger-container {
    --bg: #47cab1;
    --bg-hover: #6fd6c1;
    --strips: #ffffff;
    --strips-hover: #ffffff;

    cursor: pointer;
    pointer-events: all;
    @include flex-x(center, center);
    position: relative;
    padding: 10px;
    height: 50px;
    background: var(--bg);
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 7px -3px $black;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.25s;

    .vt__burger {
        pointer-events: none;
        position: relative;
        width: 30px;
        height: 20px;
        transform: translate3d(0, 2px, 0);

        span {
            display: block;
            position: absolute;
            height: 2px;
            width: 100%;
            left: 0;
            border-radius: 2px;
            background: var(--strips);
            opacity: 1;
            transform: rotate(0deg);
            transition: all 0.25s;
        }

        $top: 0, 7, 7, 7, 14;

        @for $i from 1 through 5 {
            span:nth-child(#{$i}) {
                top: nth($top, $i) + px;
            }
        }
    }

    &.vt__burger-open span {
        background: var(--strips);

        &:nth-of-type(1),
        &:nth-of-type(5) {
            transform: rotate(0deg) scaleY(0);
            top: 9px;
        }
        &:nth-of-type(2) {
            transform: rotate(45deg);
        }
        &:nth-of-type(3) {
            transform: rotate(-45deg);
        }
        &:nth-of-type(4) {
            transform: rotate(0deg) scaleY(0);
        }
    }

    &:hover,
    &:focus {
        background: var(--bg-hover);

        span {
            background: var(--strips-hover);
        }
    }
}
</style>
