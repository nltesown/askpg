<script>
  let i = 0;

  function setColumnObserver(elContainer) {
    let wait = false; // Debounce flag.
    const observer = new IntersectionObserver(
      () => {
        // Ici, on appellera l'alignement des colonnes (cf. syncvpos).
        // Avec un délai de debounce.
        if (wait === false) {
          wait = true;
          i++;
          // TODO: appel.
          setTimeout(() => {
            wait = false;
          }, 1000);
        }
      },
      { elContainer, rootMargin: "-1px", threshold: 0 }
    );

    for (let elWeek of Array.from(elContainer.querySelectorAll(".week"))) {
      observer.observe(elWeek);
      console.log(elWeek);
    }
  }
</script>

<div class="container" use:setColumnObserver>
  <div class="calendar">
    <div class="week" style="background-color: #9cf;">Semaine 1</div>
    <div class="week" style="background-color: #c9f;">Semaine 2</div>
    <div class="week" style="background-color: #cf9;">Semaine 3</div>
    <div class="week" style="background-color: #fc9;">Semaine 4</div>
  </div>
</div>

<div class="info">{i}</div>

<style>
  :global(body) {
    position: relative;
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
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .week {
    flex: 0 0 25%;
    outline: solid 1px blue;
    scroll-snap-align: start;
  }

  .info {
    position: fixed;
    display: inline-block;
    top: 50%;
    left: 50%;
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    .week {
      flex: 0 0 100%;
    }
  }
</style>
