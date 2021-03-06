<template>
   <nav>
        <div class="navbar navbar-light bg-secondary">
          <div class="container ">
            <a @click.prevent="changeShowAddForm(false) || changeShowEdit(false)" href="#" class="navbar-brand">
              <strong>Kanban Board</strong><br>
            </a>
            <div v-if="isLogin">
              <button class="btn btn-outline-dark" @click.prevent="changeShowAddForm(true)">New Task</button>
              <button class="btn btn-outline-light" @click.prevent="logout">Logout</button>
            </div>
          </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['isLogin', 'logout', 'changeShowAddForm', 'changeShowEdit'],
}
</script>

<style>

</style>