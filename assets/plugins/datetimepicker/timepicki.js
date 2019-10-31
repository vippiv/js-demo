(function($) {
    $.fn.timepicki = function(options) {
        var defaults = {};
        var settings = $.extend({},
        defaults, options);
        return this.each(function() {
            var ele = $(this);
            var ele_hei = ele.outerHeight();
            var ele_lef = ele.position().left;
            ele_hei += 15;
            $(ele).wrap("<div class='time_pick'>");
            var ele_par = $(this).parents(".time_pick");
            ele_par.append("<div class='timepicker_wrap'><p>开始时间</p><div class='first'><div class='arrow_top'></div><div class='time'><div class='prev'></div><div class='ti_tx'></div><div class='next'></div></div><div class='mins'><div class='prev'></div><div class='mi_tx'></div><div class='next'></div></div><div class='meridian'><div class='prev'></div><div class='mer_tx'></div><div class='next'></div></div></div><p>结束时间</p><div class='last'><div class='arrow_top'></div><div class='time'><div class='prev'></div><div class='ti_tx'></div><div class='next'></div></div><div class='mins'><div class='prev'></div><div class='mi_tx'></div><div class='next'></div></div><div class='meridian'><div class='prev'></div><div class='mer_tx'></div><div class='next'></div></div></div></div>");
            var ele_next = $(this).next(".timepicker_wrap");
            var ele_next_all_child = ele_next.find("div");
            ele_next.css({
                "top": ele_hei + "px",
                "left": ele_lef + "px"
            });
            $(document).on("click",
            function(event) {
                if (!$(event.target).is(ele_next)) {
                    if (!$(event.target).is(ele)) {
                        var tim1 = ele_next.find('.first').find(".ti_tx").html();
                        var tim2 = ele_next.find('.last').find(".ti_tx").html();

                        var mini1 = ele_next.find('.first').find(".mi_tx").text();
                        var mini2 = ele_next.find('.last').find(".mi_tx").text();

                        var meri1 = ele_next.find('.first').find(".mer_tx").text();
                        var meri2 = ele_next.find('.last').find(".mer_tx").text();

                        if (tim1.length != 0 && mini1.length != 0 && meri1.length != 0 && tim2.length != 0 && mini2.length != 0 && meri2.length != 0) {
                            ele.val(tim1 + " : " + mini1 + " : " + meri1+' - '+tim2 + " : " + mini2 + " : " + meri2)
                        }
                        if (!$(event.target).is(ele_next) && !$(event.target).is(ele_next_all_child)) {
                            ele_next.fadeOut()
                        }
                    } else {
                        set_date(event);
                        ele_next.fadeIn()
                    }
                }
            });
            function set_date() {
                var d = new Date();
                var ti = d.getHours();
                var mi = d.getMinutes();
                var mer = "AM";
                if (12 < ti) {
                    ti -= 12;
                    mer = "PM"
                }
                if (ti < 10) {
                    ele_next.find('div').find(".ti_tx").text("0" + ti)
                } else {
                    ele_next.find('div').find(".ti_tx").text(ti)
                }
                if (mi < 10) {
                    ele_next.find('div').find(".mi_tx").text("0" + mi)
                } else {
                    ele_next.find('div').find(".mi_tx").text(mi)
                }
                if (mer < 10) {
                    ele_next.find('div').find(".mer_tx").text("0" + mer)
                } else {
                    ele_next.find('div').find(".mer_tx").text(mer)
                }
            }
            var cur_next = ele_next.find(".next");
            var cur_prev = ele_next.find(".prev");

            $(cur_prev).add(cur_next).on("click",
                function() {
                    var cur_ele = $(this);
                    var cur_cli = null;
                    var ele_st = 0;
                    var ele_en = 0;
                    if (cur_ele.parent().attr("class") == "time") {
                        cur_cli = "time";
                        ele_en = 12;
                        var cur_time = null;
                        cur_time = $(this).parent().parent().find("." + cur_cli + " .ti_tx").text();// ele_next
                        cur_time = parseInt(cur_time);
                        if (cur_ele.attr("class") == "next") {
                            if (cur_time == 12) {
                                ele_next.find("." + cur_cli + " .ti_tx").text("01")
                            } else {
                                cur_time++;
                                if (cur_time < 10) {
                                    $(this).parent().parent().find("." + cur_cli + " .ti_tx").text("0" + cur_time)// ele_next
                                } else {
                                    $(this).parent().parent().find("." + cur_cli + " .ti_tx").text(cur_time)// ele_next
                                }
                            }
                        } else {
                            if (cur_time == 1) {
                                $(this).parent().parent().find("." + cur_cli + " .ti_tx").text(12)// ele_next
                            } else {
                                cur_time--;
                                if (cur_time < 10) {
                                    $(this).parent().parent().find("." + cur_cli + " .ti_tx").text("0" + cur_time)// ele_next
                                } else {
                                    $(this).parent().parent().find("." + cur_cli + " .ti_tx").text(cur_time)// ele_next
                                }
                            }
                        }
                    } else if (cur_ele.parent().attr("class") == "mins") {
                        cur_cli = "mins";
                        ele_en = 59;
                        var cur_mins = null;
                        cur_mins = $(this).parent().parent().find("." + cur_cli + " .mi_tx").text();// ele_next
                        cur_mins = parseInt(cur_mins);
                        if (cur_ele.attr("class") == "next") {
                            if (cur_mins == 59) {
                                $(this).parent().parent().find("." + cur_cli + " .mi_tx").text("00")// ele_next
                            } else {
                                cur_mins++;
                                if (cur_mins < 10) {
                                    $(this).parent().parent().find("." + cur_cli + " .mi_tx").text("0" + cur_mins)// ele_next
                                } else {
                                    $(this).parent().parent().find("." + cur_cli + " .mi_tx").text(cur_mins)// ele_next
                                }
                            }
                        } else {
                            if (cur_mins == 0) {
                                $(this).parent().parent().find("." + cur_cli + " .mi_tx").text(59)// ele_next
                            } else {
                                cur_mins--;
                                if (cur_mins < 10) {
                                    $(this).parent().parent().find("." + cur_cli + " .mi_tx").text("0" + cur_mins)// ele_next
                                } else {
                                    $(this).parent().parent().find("." + cur_cli + " .mi_tx").text(cur_mins)// ele_next
                                }
                            }
                        }
                    } else {
                        ele_en = 1;
                        cur_cli = "meridian";
                        var cur_mer = null;
                        cur_mer = $(this).parent().parent().find("." + cur_cli + " .mer_tx").text();// ele_next
                        if (cur_ele.attr("class") == "next") {
                            if (cur_mer == "AM") {
                                $(this).parent().parent().find("." + cur_cli + " .mer_tx").text("PM")// ele_next
                            } else {
                                $(this).parent().parent().find("." + cur_cli + " .mer_tx").text("AM")// ele_next
                            }
                        } else {
                            if (cur_mer == "AM") {
                                $(this).parent().parent().find("." + cur_cli + " .mer_tx").text("PM")// ele_next
                            } else {
                                $(this).parent().parent().find("." + cur_cli + " .mer_tx").text("AM")// ele_next
                            }
                        }
                }
            });
        });
    }
} (jQuery));