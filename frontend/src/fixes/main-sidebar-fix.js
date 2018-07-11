import $ from 'jquery'

export function carregarTree() {
    $('[data-widget="tree"]').tree({
        animationSpeed: 500,
        accordion: true,
        followLink: false,
        trigger: '.treeview a'
    });
}