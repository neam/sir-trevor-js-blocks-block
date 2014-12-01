SirTrevor.Blocks.Blocks = (function () {

    return SirTrevor.Blocks.Columns.extend({

        type: "blocks",
        title: function () {
            return i18n.t('blocks:blocks:title');
        },
        icon_name: 'columns',

        // This block is supposed to be extended before being actually included in the toolbar - make sure that extended blocks set this property to "true"
        toolbarEnabled: false,

        // Used as key in the stored data for the the list of sub-elements
        list_data_key: 'blocks',

        columns_presets: {
            'blocks': [12] // One single level
        },

        controllable: false,

        _setBlockInner: function () {
            SirTrevor.Block.prototype._setBlockInner.apply(this, arguments);
            this.applyColumns('blocks', true);
            /* default */
        },

        toData: function () {
            var self = this;
            var column_config = this.columns_presets[this.columns_preset];
            var dataObj = {};
            dataObj[self.list_data_key] = [];

            this.getColumns().each(function (i) {
                var blocksData = [];
                $(this).children('.st-block').each(function () {
                    var block = self.sirTrevor.findBlockById(this.getAttribute('id'));
                    blocksData.push(block.saveAndReturnData());
                });

                dataObj[self.list_data_key] = blocksData;
            });

            this.setData(dataObj);
        },

        loadData: function (dataObj) {
            this.applyColumns('blocks', true);

            var self = this;
            var children = (dataObj[self.list_data_key] || []);
            var $block = null;
            var $column = this.getColumn(0);
            for (var j = 0; j < children.length; j++) {
                var block = children[j];
                $block = this.sirTrevor.createBlock(block.type, block.data, $block ? $block.$el : $column.children('.st-block-controls__top'));
            }
        }

    });

})();
