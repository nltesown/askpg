<script>
</script>

<div class="container">
  <div class="calendar">
    <div class="week" style="background-color: #9cf;">Semaine 1</div>
    <div class="week" style="background-color: #c9f;">Semaine 2</div>
    <div class="week" style="background-color: #cf9;">Semaine 3</div>
    <div class="week" style="background-color: #fc9;">Semaine 4</div>
  </div>
</div>

<style>
  :global(body) {
    overflow-y: hidden;
  }

  .container {
    width: 100%;
    max-width: 1000px;
    height: 90vh;
    margin: 5vh auto;
    outline: solid 1px red;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
  }

  .calendar {
    display: flex;
    height: 200vh;
    overflow: auto;
    scrollbar-width: thin;
  }

  .week {
    flex: 0 0 25%;
    outline: solid 1px blue;
    scroll-snap-type: x mandatory;
  }

  @media (max-width: 500px) {
    .week {
      flex: 0 0 100%;
    }
  }
</style>
