<div class="container">
  <form action="">
    <fieldset>
      <label
        ><input type="checkbox" /><span
          >This is about fixing a (FF) bug that prevented the fieldset to remain constrained in its
          parent.</span
        ></label
      ><label <label
        ><input type="checkbox" /><span
          class="nowrap"
          title="This has to be some long option which you can spend some time scratching your head before you find out what it's for."
          >This has to be some long option which you can spend some time scratching your head before
          you find out what it's for.</span
        ></label
      >
      <label><input type="checkbox" /><span>*</span></label>
      <label><input type="checkbox" /><span>*</span></label><label
        ><input type="checkbox" /><span>*</span></label
      >
      <label><input type="checkbox" /><span>*</span></label><label
        ><input type="checkbox" /><span>*</span></label
      >
      <label><input type="checkbox" /><span>*</span></label>
    </fieldset>
  </form>
</div>

<style>
  .container {
    width: 400px;
    margin: 48px auto;
    outline: solid 1px red;
  }

  form {
    margin: 0 0 12px 0;
    font-size: 0.938rem;
    outline: solid 2px yellow;
  }

  input[type="reset"] {
    display: block;
    width: 100%;
    padding: 8px 0;
    margin: 0 0 12px 0;
  }

  fieldset {
    /* FF bug workaround: https://stackoverflow.com/a/17863685/494979 */
    display: table-cell;
    min-width: 0;
  }

  label {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding: 5px 8px 5px 0;
    margin: 0 0 2px 0;
    cursor: pointer;
    user-select: none;
    outline: solid 1px blue;
  }

  label > input[type="checkbox"] {
    flex: 0 0 auto;
    margin: 0 12px 0 4px;
  }

  label > span {
    flex: 0 1 auto;
  }

  label.selected,
  label.selected:hover {
    background-color: #82aed9;
    color: #004d99;
  }

  label:hover {
    background-color: #bbb;
  }

  .nowrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
