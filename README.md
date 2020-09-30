**Install**

```bash
npm i vue-dk-lib
```

**Import**

```js
import 'vue-dk-lib';
import 'vue-dk-lib/dist/dkLib.css';
```

**Examples**

```vue
<template>
    <div id="app">
        <DKNavbar :styles="navbarStyles" position="top">
            <h1>Bonjour</h1>

            <DKSearchbar
                :searchFunction="searchFunction"
                :styles="searchbarStyles"
                iconColor="#fff"
                background="rgba(0,0,0,0.5)"
                @search-value="searchValue($event)"
            />

            <DKHoverbox>
                <a href="#">Home</a>
            </DKHoverbox>

            <div class="auth-btns">
                <DKHoverbox :containerStyles="hoverboxContainerStyles">
                    <DKButton
                        :styles="btnStyles"
                        hoverBackground="brown"
                        hoverColor="aqua"
                        :rainbow="true"
                        :rainbowBorder="true"
                        >Login</DKButton
                    >
                </DKHoverbox>

                <DKButton :styles="btnStyles" :ripple="false" :shine="true">Signup</DKButton>
            </div>
        </DKNavbar>

        {{ search }}

        <DKHoverbox :styles="hoverboxStyles" fill="red">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo commodi necessitatibus id
            cupiditate eum, quas nulla esse nesciunt veniam error.
        </DKHoverbox>

        <DKTooltip text="Check" position="right" :styles="tooltipStyles" :arrow="false">
            <DKButton :rainbow="true">CRAZY</DKButton>
        </DKTooltip>

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae corporis?
            Earum quos
            <DKTooltip text="An unknown word"
                ><span style="text-decoration: underline;">quibusdam</span></DKTooltip
            >, perferendis nesciunt nostrum ea laboriosam cumque.
        </p>

        <DKPagination
            :currentPage="1"
            :lastPage="10"
            @page-changed="paginateHandler($event)"
            :styles="paginationStyles"
            :blockStyles="paginationBlockStyles"
        >
            ►
        </DKPagination>

        <DKVideo
            :videoSrc="testSrc"
            :containerStyles="videoContainerStyles"
            videoPoster="https://a.storyblok.com/f/87848/800x800/a97f990693/sudhith-xavier-iun1o500lmi-unsplash-1.jpg"
        />
        <DKVideo
            v-for="video in videos"
            :key="video._uid"
            :videoId="String(video._uid)"
            :videoSrc="video.video.filename"
            :videoTitle="video.title"
            :videoFocused="videoFocused"
            :videoPoster="video.poster ? video.poster.filename : ''"
            :timeTags="video.tags"
            :buttonStyles="videoButtonStyles"
            :thumbStyles="videoThumbStyles"
            :containerStyles="videoContainerStyles"
            :contextmenu="false"
            trackColor="red"
            @click.native="videoFocused = String(video._uid)"
            @video-focused="videoFocused = String(video._uid)"
        />

        <DKPopup :styles="popupStyles" crossColor="white" :cookie="true">Hey there!</DKPopup>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    data() {
        return {
            videos: [],
            videoFocused: '',
            search: '',
            hoverboxStyles: {
                borderRadius: '50%',
            },
            hoverboxContainerStyles: {
                display: 'inline-flex',
            },
            tooltipStyles: {
                fontSize: '12px',
                backgroundColor: 'blue',
                boxShadow: '10px 10px 1px black',
            },
            btnStyles: {
                fontSize: '15px',
                backgroundColor: 'red',
                margin: '0 10px',
            },
            navbarStyles: {
                backgroundColor: 'grey',
                color: 'white',
                fontSize: '15px',
            },
            popupStyles: {
                fontSize: '15px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                borderColor: 'white',
            },
            videoContainerStyles: {
                borderRadius: '10px',
                boxShadow: '1px 1px 10px -5px black',
                overflow: 'hidden',
            },
            videoButtonStyles: {
                backgroundColor: 'red',
                border: 'none',
            },
            videoThumbStyles: {
                border: '1px solid red',
                borderRadius: '5px',
            },
            searchbarStyles: {
                fontSize: '15px',
                color: 'white',
                borderColor: 'white',
            },
            searchFunction: function(search) {
                console.log(search);
            },
            paginationStyles: {
                color: 'white',
                borderRadius: '5px',
            },
            paginationBlockStyles: {
                borderRadius: '5px',
                backgroundColor: '#054',
                margin: '0 1px',
            },
            testSrc: '',
        };
    },

    methods: {
        searchValue(e) {
            this.search = e;
        },
        paginateHandler(e) {
            console.log(e);
        },
    },

    async created() {
        await Axios.get(
            `https://api.storyblok.com/v1/cdn/stories/videos?version=published&token=${process.env.VUE_APP_STORYBLOK_TOKEN}&cv=1596995321`
        ).then(res => {
            this.videos = res.data.story.content.sets[0].videos;

            // Async source loading
            setTimeout(() => {
                this.testSrc = res.data.story.content.sets[0].videos[0].filename;
            }, 5000);
        });
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,regular,italic,700,700italic,900,900italic');

body {
    margin: 0;
    height: 100vh;
    width: 100%;
}

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    margin-top: 150px;
    overflow: hidden;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
```