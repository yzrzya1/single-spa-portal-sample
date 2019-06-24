<template>
    <div class="hello">
        <div>{{ msg }}</div>
        <div>
            <br>
            <div><b>Count: {{ state.reducer.count }}</b></div>
            <br>
            <button v-on:click.prevent="increment">Increase Global</button>Send a <b>global</b> increment event.
            This will increase the counter for the current app and all other apps that listen to this event. <br/>
            <button v-on:click.prevent="decrement">Decrease Global</button>Send a <b>global</b> decrease event.
            This will decrease the counter for the current app and all other apps that listen to this event. <br/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
        },
        data() {
            return {
                state: this.$root.store.getState(),
            };
        },
        created() {
          this.$root.store.subscribe(() => this.updateCount());
        },
        methods: {
            increment() {
                this.$root.globalEventDistributor.dispatch({ type: 'INCREMENT' });
                this.updateCount();
            },
            decrement() {
                this.$root.globalEventDistributor.dispatch({ type: 'DECREMENT' });
                this.updateCount();
            },
            updateCount() {
                this.state = this.$root.store.getState();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
