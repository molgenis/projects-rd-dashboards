<template>
  <div v-if="children" class="tree__subtree__toggle">
    <button
      :id="`toggle-${id}`"
      class="tree__toggle"
      @click="onclick"
      :aria-expanded="isOpen"
      :aria-controls="`subtree-${id}`"
    >
      <TreeViewItemIcon
        :iconType="
          (group === 'patient' && isOpen)
          ? 'folder-open'
          : (group === 'patient' && !isOpen)
            ? 'folder-closed'
            : group"
      />
      <span class="tree__item__label">{{ name }}</span>
    </button>
    <TreeViewItemLink
      :href="href"
      :hrefLabel="`go to ${group} ${name} in the database`"
      v-show="href"
    />
    <ul :id="`subtree-${id}`" class="tree__subtree" role="group" v-show="isOpen">
      <li class="tree__item" v-for="child in children" :key="child.name">
        <TreeViewItem
          :id="child.id"
          :name="child.name"
          :group="child.group"
          :href="child.href"
          :hrefLabel="`view ${child.group} ${child.name}`"
          :children="child.children"
          ref="treeItem"
        />
      </li>
    </ul>
  </div>
  <div v-else class="tree__subtree__none">
    <TreeViewItemIcon :iconType="group"/>
    <span class="tree__item__label">{{ name }}</span>
    <TreeViewItemLink
      :href="href"
      :hrefLabel="`view ${group} ${name}`"
      v-show="href"
    />
  </div>
</template>

<script>
import TreeViewItemIcon from './TreeViewItemIcon.vue'
import TreeViewItemLink from './TreeViewItemLink.vue'

export default {
  name: 'treeViewItem',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: false
    },
    children: {
      type: Array,
      required: false
    }
  },
  components: {
    TreeViewItemIcon,
    TreeViewItemLink
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    onclick () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.tree__subtree {
  list-style: none;
  padding: 0;
  border-left: 1px dashed $gray-300;
  padding-left: 18px;
  margin-left: 10px;
  
  .tree__item {
    font-size: 11pt;
  }
}

.tree__toggle {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  cursor: pointer;
  
  .tree__item__label {
    text-decoration: underline;
  }
  
  &:hover, &:focus {
    .tree__item__label {
      background-color: hsl(223, 74%, 91%);
      color: #1b47b7;
    }
  }
}

.tree__subtree__toggle {
  display: grid;
  justify-content: flex-start;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-template-areas: 
    "button link"
    "list list";
  
  .tree__toggle {
    grid-area: button;
    @include flexStartCenter;
  }
  .tree__item__link {
    grid-area: link;
  }
  .tree__subtree {
    grid-area: list;
  }
}

.tree__subtree__none {
  @include flexStartCenter;
}

.tree__item {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 16px;
    margin-left: -16px;
    border-bottom: 1px dashed $gray-400;
  }
}

.tree__item__label {
  letter-spacing: 0.04em;
  padding: 4px 6px;
  border-radius: 6px;
  margin-left: 4px;
  color: #252525;
}
</style>
