<script setup>
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import '@/assets/css/reset.css';
</script>
<template>
  <Header></Header>
  <Nav></Nav>
  <router-view></router-view>
  <Footer></Footer>
</template>
<style scoped>
</style>