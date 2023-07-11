export type UserData = {
    id: string;
    bio: string | null;
    name: string | null;
    username: string | null;
    dateofbirth: string | null;
    gender: string | null;
    photo: string | null;
    /*
        For the gamification of tasks, habits, and routines being
        followed.
        We can renderise the "level" of the user with the xp. 
    */
    xp: number;
    /*
        The list of tasks included in this user.
    */
    tasks: Array<Task>;
    /*
        The list of habits included in this user.
    */
    habits: Array<Habit>;
    /*
        The list of routines included in this user.
    */
    routines: Array<Routine>;
};

/*
    A routine is a list of seven habits separated by day.
*/
export type Routine = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;
    /*
        Short description of what the task is.
        Iff one element: "title"
        Iff two elements: "title", "description"
        Disregard other occasions.
    */
    name: [string] | [string, string];

    /*
        How many times this habit was particularly completed.
    */
    completed: number;

    /*
        A list of habits per id.
    */
    habits: Array<number>;
};

/*
    A habit is a time-range that includes a list of tasks.
*/
type HabitPeriod = "morning" | "afternoon" | "evening" | string;
export type Habit = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;

    /*
        Short description of what the task is.
        Iff one element: "title"
        Iff two elements: "title", "description"
        Disregard other occasions.
    */
    name: [string] | [string, string];

    /*
        Which day(s) this habit applies to?
        Note: Obviously it should not have more than seven elements;
              At minimum it should have one element.
    */
    days: Array<
        | "sunday"
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
    >;

    /*
        The time range where this habit is applied.
        If any string then follow the format: "HH:MM-HH:MM"
        where the first *HH:MM* cannot be equal to the second.
        Gamification: being completed in the period range can give more xp.
    */
    period: [HabitPeriod] | [HabitPeriod, HabitPeriod];

    /*
        How many times this habit was particularly completed.
    */
    completed: number;

    /*
        The list of tasks per id included in this habit.
    */
    tasks: Array<number>;
};

/*
    A task is activity that must be done (once or more)
*/
export type Task = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;
    /*
        Short description of what the task is.
        Iff one element: "title"
        Iff two elements: "title", "description"
        Disregard other occasions.
    */
    name: [string] | [string, string];

    /* 
        Can be used to differentiate the status of the task.
        For example, if there 5 'times' a task must be made:
        then 5 'done' means it is complete;
        1 to 4 'done' means it is in progress;
        0 means it was not completed.
    */
    done: number;
    times: number;
    completed: boolean;
    /*
        Streak of a task being completed.
        In pseudo-code terms, when reseting the task with its "repeated"
        property, add one to this *streak* property if it is completed, else
        reset to zero.
        This means that the streak can only be updated after its "repeated"
        period has finished; So if it is daily, it will only increase one after
        a day has passed and the task was completed.
        Gamification: it can be a multiplier when completing a task (plus 
            adding more xp).
    */
    streak: number;
    /*
        Defined by the user to have higher priority display 
        going from the highest "high" to the lowest.
        Gamification: Tasks with higher priority can give more xp.
    */
    priority: "high" | "medium" | "low";
    /*
        In case it already has passed perhaps even gray out.
        Formatted as such: *hours:minutes* for the elements
        in the pair, the first representing the start
        and the second the end.
        Gamification: being completed in the period range can give more xp.
    */
    period: [string, string];
    /*
        Counts in hours to be repeated every N hours after
        started its time.
        Has to be positive.
        If it is string, it will reset by a static time instead.
    */
    repeated: "daily" | "weekly" | "monthly" | "yearly" | number;
    /*
        Meta variables are here to calculate if a task has already
        passed enough time or not since its start time was conceived.
        
        For example: 1344646810
        TODO: Use 
              Math.floor(new Date('2012-08-10 22:00:10').getTime() / 1000)
        TODO: Should be calculated using a external system (one idea is to
              have a local array of IDs of tasks with meta_start atributes.)
    */
    // meta_start: number;
    /*
        To set if it can be shared?
        NOTE: Should not exist such varible when we add a 
        sharing system, because when we do we should not check
        if shared is false or true, instead we should check
        if the task has a list of users attached to that specific task...
        That's why Tasks is global in the database.
    */
    shared: boolean;
    shared_id: number;

    /*
        Get reminders for the habit in the device from the application.
        The system works by notifying the user 
        NOTE: the system of cache needs to be implemented first.
        TODO: how such system would work?
        TODO: see background running application with Expo.
        TODO: see local data access through background running.
    */
    // reminders: boolean;
};
