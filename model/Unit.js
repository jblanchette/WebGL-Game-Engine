G.model.Unit = Class.create(G.model.Entity, {
    initialize: function($super){
        $super();
        this.health = 100;
        this.mana = 100;
        this.addCommand('Idle');
        /*
         *  Cursor mode is equal to what the "cursor" is about to do
         *  Modes:
         *   0: Default cursor.
         *      -Right clicking issues "Move" command
         *      -Left clicking just selects.
         *
         *   1: Attack Move.
         *      -Right clicking cancels the cursor mode.
         *      -Left clicking issues "AttackMove" command
         *
         *   2: Manual Move.
         *      -Right clicking cancels the cursor mode.
         *      -Left clicking issues "Move" with 'NoAttack' property
         *
         *   3: Spell Cast
         *      -Right clicking cancels the cursor mode.
         *      -Left clicking issues "Spell" command
         *      **NOTE: There are spells that wont change cursor mode
         *              if they are instant cast. **
         */



        this.cursorMode = 0;
        this.cursorAlias = ['Default','Attack Move','Manual Move','Spell Cast'];

    },
    getMoveSpeed: function(){
        return this.movespeed;
    }
});