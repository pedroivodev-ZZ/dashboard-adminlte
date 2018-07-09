import $ from 'jquery'

export function carregarTree() {
    $('.widget-tree').tree({
    //$('[data-widget="tree"]').tree({
        animationSpeed: 500,
        accordion: true,
        followLink: false,
        trigger: '.treeview a'
    });
}