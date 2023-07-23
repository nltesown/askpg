<script lang="ts">
  let data = [];

  async function loadSeances() {
    data = await loadJSON(
      "https://raw.githubusercontent.com/cinemathequefr/Publications_cycles/master/data/PROG143%20Mars-mai%202023/PROG143_GLOBAL/PROG143_SEANCES.json"
    );
  }

  async function loadJSON(url) {
    try {
      let data = await fetch(url);
      if (data.ok === true) {
        // Une réponse HTTP valide a été obtenue.
        try {
          return await data.json();
        } catch (e) {
          // La réponse n'a pas pu être parsée comme JSON.
          console.error(`Invalid JSON at ${url}`);
          throw e;
        }
      }
    } catch (e) {
      console.error(`Network error while requesting ${url}`);
      throw e;
    }
  }
</script>

<button on:click={loadSeances}>Load</button>

{JSON.stringify(data, null, 2)}
