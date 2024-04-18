export enum WerewolvesAction {
    KILL = 'KILL', // 狼指定人，可能未杀
    GUARD = 'GUARD', // 守卫守护
    VOTE = 'VOTE', // 白天投票
    WITCH_SAVE = 'WITCH_SAVE', // 女巫救人
    WITCH_POISON = 'WITCH_POISON', // 女巫毒人
    SEER = 'SEER', // 预言家验人
    FOLLOW = 'FOLLOW', // 野孩子跟随，混子跟随
    WEREWOLF_BEAUTY_SLEEP = 'WEREWOLF_BEAUTY_SLEEP' // 狼美人睡人;
}
