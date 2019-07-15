Vue.component('select2', {
    props: {
        options: Array,
        value: String,
        search: Boolean,
        allowClear: {
          type: Boolean,
          default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        buscar: {
          type: Boolean,
          default: false,
        },
    },
    template: '<select><slot></slot></select>',
    mounted: function () {
        console.log('select2 mounted');
        console.log(this.value);
        this.create_select();
    },
    watch: {
        value: function (value) {
            // update value
            // console.log(typeof value);
            // console.log(value)
            console.log('watch value', value);
            console.log('watch this.value', this.value);
            $(this.$el).val(this.value).trigger('change');
        },
        options: function (options, old_options) {
            var old_value = this.value;
            $(this.$el).off().select2('destroy');
            // console.log('Change options');
            // console.log(old_value)
            this.create_select();
        }
    },
    methods: {
        create_select () {
            var vm = this;
            // Cuando hay un options desde el server se deshabilita la búsqueda
            if(typeof this.options != 'undefined') {
                //console.log(this.options);
                $(this.$el)
                // init select2
                    .select2({
                        allowClear: this.allowClear,
                        placeholder: this.placeholder,
                        data: this.options,
                        containerCssClass: "select-plantilla",
                        width: '100%',
                    })
                    .val(this.value)
                    .trigger('change')
                    // emit event on change.
                    .on('change', function (e) {
                        console.log('change', e)
                        var seleccion = $(this).select2('data')[0];
                        if (seleccion != undefined) {
                            console.log('change function', seleccion.id);
                            vm.$emit('input', seleccion.id)
                        }
                    })
            } else {
                //console.log('allowClear', this.allowClear);
                var opciones = {
                    //data: this.options,
                    allowClear: this.allowClear,
                    placeholder: this.placeholder,
                    containerCssClass: "select-plantilla",
                    width: '100%',
                }
                if (!this.buscar) {
                    opciones.minimumResultsForSearch = -1;
                }
                $(this.$el)
                // init select2
                    .select2(opciones)
                    .val(this.value)
                    .trigger('change')
                    .on('change', function (e) {
                        console.log('change', e);
                        console.log('change', $(this).select2('data'));
                        vm.$emit('input', this.value)
                    })
            }
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy')
    }
});

Vue.component('select2-multiple', {
    props: {
        options: Array,
        value: Array,
        search: Boolean,
        checkDefault: {
          type: Boolean,
          default: false,
        },
    },
    template: '<select multiple="multiple"><slot></slot></select>',
    mounted: function () {
        //console.log('select2 mounted');
        this.create_select();
    },
    watch: {
        value: function (value) {
            // update value
            //console.log(typeof value);
            if ($(this.$el).val() != null){
            if (Array.from(value).sort().join(",") !== Array.from($(this.$el).val()).sort().join(","))
                $(this.$el).val(value).trigger('change');
            } else {
                console.log('Val es null');
            }
            // console.log(this.value);

        },
        options: function (options, old_options) {
            $(this.$el).off().select2('destroy');
            this.create_select();
        }
    },
    methods: {
        create_select () {
            var vm = this;
            // Cuando hay un options desde el server se habilita la búsqueda
            if(typeof this.options != 'undefined') {
                $(this.$el)
                // init select2
                    .select2({
                        data: this.options,
                        containerCssClass: "select-multiple",
                        width: 'resolve',
                        width:'100%',
                    })
                    .val(this.value)
                    .trigger('change')
                    // emit event on change.
                    .on('change', function () {
                        console.log(this.value);
                        //vm.$emit('input', )
                        vm.$emit('input',  $(this).val());
                        vm.$emit('input-change', $(this).val());
                    })
            } else{
                $(this.$el)
                // init select2
                    .select2({
                        data: this.options,
                        containerCssClass: "select-multiple",
                        minimumResultsForSearch: -1,
                        width: '100%',
                    })
                    .val(this.value)
                    .trigger('change')
                    // emit event on change.
                    .on('change', function () {
                        vm.$emit('input',  $(this).val())
                        vm.$emit('input-change', $(this).val());
                    })
            }
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy')
    }
});