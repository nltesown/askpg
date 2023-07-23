<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { createMachine, assign } from "xstate";

  const fetchMachine = createMachine<{ retries: number }>(
    {
      id: "fetch",
      initial: "idle",
      context: {
        retries: 0
      },
      states: {
        idle: {
          on: {
            FETCH: "loading"
          }
        },
        loading: {
          invoke: {
            src: "fetch",
            onDone: "success",
            onError: "failure"
          }
          // on: {
          //   RESOLVE: "success",
          //   REJECT: "failure"
          // }
        },
        success: {
          //   type: "final"
        },
        failure: {
          on: {
            RETRY: {
              target: "loading",
              actions: assign({
                retries: (context, event) => context.retries + 1
              })
            }
          }
        }
      }
    },
    {
      services: {
        fetch: async () => {
          return new Promise((resolve, reject) => {
            console.log("OK");
            resolve("OK");
          });
        }
      }
    }
  );

  const { state, send } = useMachine(fetchMachine);

  const progs = {
    124: "https://raw.githubusercontent.com/cinemathequefr/Publications_cycles/master/data/PROG124%20Septembre-novembre%202022/PROG124_GLOBAL/PROG124_SEANCES.json",
    129: "https://raw.githubusercontent.com/cinemathequefr/Publications_cycles/master/data/PROG129%20D%C3%A9cembre%202022-F%C3%A9vrier%202023/PROG129_GLOBAL/PROG129_SEANCES.json",
    143: "https://raw.githubusercontent.com/cinemathequefr/Publications_cycles/master/data/PROG143%20Mars-mai%202023/PROG143_GLOBAL/PROG143_SEANCES.json",
    146: "https://raw.githubusercontent.com/cinemathequefr/Publications_cycles/master/data/PROG146%20FIFR%202023/PROG146_GLOBAL/PROG146_SEANCES.json",
    666: "https://zodkfdkgkd.fr"
  };
  let progIds: number[] = Object.keys(progs).map((i) => Number(i));
  let currentProgId: number;

  let data;

  requestProg();

  async function requestProg() {
    if (progIds.indexOf(currentProgId) < 0) {
      currentProgId = progIds[progIds.length - 1];
    } else {
      currentProgId = progIds[(progIds.indexOf(currentProgId) + 1) % progIds.length];
    }

    send("FETCH");

    // data = await fetchData(progs[currentProgId]);
  }

  //   async function fetchData(url: URL) {
  //     try {
  //       send("FETCH");
  //       let data = await (await fetch(url)).json();
  //       console.log(data);
  //       send("RESOLVE");
  //       return data;
  //     } catch (e) {
  //       console.log("***");
  //       console.log(e);
  //       send("REJECT");
  //     }
  //   }
</script>

<button on:click={requestProg}>{currentProgId}</button>
