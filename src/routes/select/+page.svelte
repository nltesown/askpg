<script>
  import Select from "./Select.svelte";

  let data = [
    { value: "Co" },
    { value: "Di" },
    { value: "Ra" },
    { value: "Ton" },
    { value: "De" },
    { value: "Cette" },
    { value: "Aff" },
    { value: "Air" }
  ];
</script>

<Select {data} />
