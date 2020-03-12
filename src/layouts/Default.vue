<template>
  <v-app>
    <v-app-bar app dense color="primary" dark>
      <!-- <v-app-bar-nav-icon/> -->
      <v-toolbar-title>Helping Hands, NYC</v-toolbar-title>
      <v-spacer/>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/app/" text>App</v-btn>
      <v-btn to="/about/" text>About</v-btn>
    </v-app-bar>

    <v-content>
      <slot/>
    </v-content>
  </v-app>
</template>