
<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import SearchBox from '../components/SearchBox.svelte'
</script>

<Meta
    title="SearchBox"
    component={SearchBox}
    argTypes={{}}
/>

<Template let:args>
    <SearchBox {...args} />
</Template>

<Story
    name="Default"
    args={{}}
/>
