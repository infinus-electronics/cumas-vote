<script lang="ts">
    import {Grid, Row, Column, Tile} from "carbon-components-svelte";

    export let data: Map<String, Number> | undefined;
    export let names: Map<String, String>;

    let num = data?.size
    let numRows = parseInt((num / 4))
    console.log(data)
</script>

<Grid condensed>
    {#each [...data] as [candidate, votes]}
    <Row>
        
        <Column>
            <Tile>{candidate==="RON" ? "RON" : names.get(candidate)}</Tile>              
        </Column>
        
        <Column sm={1} md={1} lg={1}>
            <Tile>{votes}</Tile>
        </Column>
    </Row>
    {/each}
</Grid>
