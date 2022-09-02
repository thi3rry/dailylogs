export function load(ctx) {
    console.log('page params', ctx, ctx.params.tag)
    return {
        tag: ctx.params.tag
    };
}
