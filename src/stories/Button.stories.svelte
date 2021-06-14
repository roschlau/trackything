
<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import Button from '../components/Button.svelte'
    import Router from 'svelte-navigator'
</script>

<Meta
    title="Button"
    component={Button}
    argTypes={{
        linkTo: { control: "text" }
    }}
/>

<Template let:args>
    <Router>
        <Button {...args} />
    </Router>
</Template>

<Story
    name="Default"
    args={{}}
/>

<Story
    name="As Link"
    args={{
        linkTo: '/test'
    }}
/>
