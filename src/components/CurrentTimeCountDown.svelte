<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        {dayName}
        <span class="countdown font-mono text-5xl">
          <span bind:this={monthDay} style="--value:2;"></span>
        </span>
        {monthName}
        <br>
        {year}
    </div>
    <div class="flex flex-col p-2">&nbsp;</div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      &nbsp;
        <span class="countdown font-mono text-5xl">
          <span bind:this={hours} style="--value:21;"></span>
        </span>
      &nbsp;
      h
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        &nbsp;
        <span class="countdown font-mono text-5xl">
          <span bind:this={minutes} style="--value:20;"></span>
        </span>
        min
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        &nbsp;
        <span class="countdown font-mono text-5xl">
          <span bind:this={seconds} style="--value:15;"></span>
        </span>
            sec
    </div>
</div>
<script>
    import dayjs from "../libs/dayjs.js";

    let monthDay, hours, minutes, seconds, dayName = 'ven', monthName = 'sept.', year = 2022;
    setInterval(() => {
        dayName = dayjs().format('ddd');
        monthName = dayjs().format('MMM');
        year = dayjs().format('YYYY');
        try {
            monthDay.style.setProperty('--value', dayjs().format('DD'));
            hours.style.setProperty('--value', dayjs().format('HH'));
            minutes.style.setProperty('--value', dayjs().format('mm'));
            seconds.style.setProperty('--value', dayjs().format('ss'));
        }
        catch (e) {}
    }, 500)
</script>
