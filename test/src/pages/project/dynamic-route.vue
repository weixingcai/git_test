<template>
<!--    <div>虽然是对象的类型,但是报错，下面的就不会报错，
        而且munted可以打印出来{{typeof $route}}</div>-->
    <div>详情{{$route.params.id}}</div>
</template>

<script>
    export default {
        name: "dynamic-route",
        data(){
            return{

            }
        },
        mounted() {
            console.log('*****',this.$route)
        }
    }
</script>

<style scoped>

</style>