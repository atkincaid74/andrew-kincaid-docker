<template>
    <div>
        <SummaryTable></SummaryTable>
        <ResultsTable></ResultsTable>
    </div>
</template>

<script>
    import ResultsTable from "./ResultsTable";
    import SummaryTable from "./SummaryTable";

    export default {
        name: "SuperContestHome",
        components: {
            ResultsTable,
            SummaryTable,
        }
    }
</script>

<style scoped>

</style>