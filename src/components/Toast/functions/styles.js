// Minify CSS
const minify = styles => {
    let selector = false;
    let value = false;

    const minified = styles
        .split('')
        .map(char => {
            // Retain spaces between selectors
            // Determine start of selector
            if ((char === '.' || char === '@' || char === '#') && !value) selector = true;
            // Determine end of selector
            if (selector && (char === ',' || char === '{')) selector = false;

            // Retain spaces between rules with multiple values
            if (char === ':' && !selector) value = true;
            if (char === ';' && !selector) value = false;

            // Replace spaces and line-breaks
            if ((char === ' ' || char === '\n' || char === '\r') && !selector && !value) return '';

            return char;
        })
        .join('')
        .split(' {')
        .join('{')
        .split(': ')
        .join(':');

    return minified;
};

// Format CSS from camelCase
export const formatCssProperties = (styles, duration) => {
    if (!styles) styles = {};

    let formatted = Object.keys(styles)
        .map(style => {
            const formattedName = style
                .split('')
                .map((letter, index) => {
                    // Vendor prefixes
                    const webkit = style.split('webkit')[0] === '';
                    const moz = style.split('moz')[0] === '';
                    const ms = style.split('ms')[0] === '';

                    if (letter === '-') return letter;
                    if ((webkit || moz || ms) && index === 0) return `-${letter.toLowerCase()}`;
                    if (letter === letter.toUpperCase()) return `-${letter.toLowerCase()}`;
                    else return letter;
                })
                .join('');
            return `${formattedName}: ${styles[style]};`;
        })
        .join('');

    // Calculate -0.15s from the end of duration for animating out
    let animation = `animation: vt__toast-in 0.15s, vt__toast-in 0.15s ${duration / 1000 -
        0.15}s reverse forwards;`;

    return (formatted += animation);
};

export const appendStylesheet = options => {
    // Format style properties/values
    let properties = formatCssProperties(options.styles, options.duration);
    let oppositePositionX;

    if (options.positionX === 'left') {
        oppositePositionX = 'right';
    } else oppositePositionX = 'left';

    // Stylesheet content
    let styles = `
        .vt__toast-container {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            position: fixed;
            ${options.positionY}: 40px;
            ${options.positionX}: 60px;
            margin-${oppositePositionX}: 60px;
            z-index: 100;
        }
        .vt__toast {
            cursor: pointer;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: distribute;
                justify-content: space-around;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            margin: 5px 0;
            padding: 7px 40px;
            min-width: 100px;
            font: 17px Avenir, sans-serif;
            text-align: center;
            border-radius: 5px;
            color: #fff;
            background: #5bd0b9;
            -webkit-box-shadow: 0 1px 3px #000;
                    box-shadow: 0 1px 3px #000;
            -webkit-transition: opacity 0.25s;
            -o-transition: opacity 0.25s;
            transition: opacity 0.25s;
            ${properties || ''}
        }
        .vt__toast:hover {
            opacity: 0.7;
        }
        .vt__icon-left,
        .vt__icon-right {
            display: flex;
            position: absolute;
            padding: 5px 12px;
        }
        .vt__icon-left {
            left: 0;
        }
        .vt__icon-right {
            right: 0;
        }
        .vt__icon-left i,
        .vt__icon-left span,
        .vt__icon-right i,
        .vt__icon-right span {
            font-size: 16px;
        }
        .vt__icon-only {
            padding: 6px 0;
        }
        .vt__icon-only .vt__icon-left,
        .vt__icon-only .vt__icon-right {
            display: flex;
            position: relative;
            right: unset;
            left: unset;
            padding: 4px;
        }
        @-webkit-keyframes vt__toast-in {
            from {
                -webkit-transform: translateY(100%);
                        transform: translateY(100%);
                opacity: 0;
            }
            to {
                -webkit-transform: translateY(0);
                        transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes vt__toast-in {
            from {
                -webkit-transform: translateY(100%);
                        transform: translateY(100%);
                opacity: 0;
            }
            to {
                -webkit-transform: translateY(0);
                        transform: translateY(0);
                opacity: 1;
            }
        }
        @media only screen and (max-width: 450px) {
            .vt__toast-container {
                right: 0;
                left: 0;
                ${options.positionY}: 10px;
                bottom: 10px;
                margin: 0 auto;
                width: 90%;
            }
            .vt__toast {
                padding: 10px 40px;
            }
            .vt__icon-only {
                -webkit-box-flex: 1;
                    -ms-flex: 1;
                        flex: 1;
                padding: 8px 30px;
            }
        }
    `;

    // Create stylesheet
    const stylesheet = document.createElement('style');

    // Set stylesheet content
    stylesheet.innerHTML = minify(styles);
    stylesheet.type = 'text/css';

    // Append
    document.head.appendChild(stylesheet);
};
