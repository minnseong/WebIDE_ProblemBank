module.exports = {

    // SELECT 
    getCategoryProblems : "select * from plass_total_categories where parent_id = 0",
    selectTagById: "select * from plass_total_categories where id = ?",
    selectTutorials: "select * from plass_total_categories where parent_id = 0",
    selectTagsByTutorialId: "select * from plass_total_categories where parent_id = ?",
    selectTagsByTutorialId2: "select tags.id,tags.name from plass_total_categories where parent_id = ?",
    selectProblemsByTagId: `select p.*,ts.input_example,ts.output_example from plass_problems as p, problems.plass_problem_category as pt, problems.plass_testcases as ts 
    where p.id = pt.problem_id and p.id = ts.problem_id and pt.category_id = ?`,
    selectProblems: "select * from plass_problems",
    selectCategoryFromProblemId: "select * from plass_total_categories where id = (select category_id FROM problems.plass_problem_category where problem_id = ?)",
    getNameTag: "select name from plass_total_categories where id = ?",
    getCountProblem: "SELECT COUNT(id) as count FROM plass_problems",
    getMyListProblem: "select * from plass_mylist_problem where user_id = ? ",
    checkLikeProblem: "select * from plass_mylist_problem where user_id = ? and problem_id = ?",
    selectTestCaseFromProblemId: "select * from plass_testcases where problem_id = ?",
    selectProblemByCategoryId: "select pbl.* FROM plass_problems as pbl,  problems.plass_problem_category as pc where  pbl.id = pc.problem_id and  pc.category_id = ?",
    selectTestCaseByProblemId: "select id, input_example as input, output_example as output from plass_testcases where problem_id = ?",

    // INSERT
    setProblemMyList: "insert into plass_mylist_problem(user_id, problem_id) values (?, ?)",
    insertProblemTag: "insert into plass_problem_category(problem_id, category_id) values (?, ?)",
    
    // DELETE
    removeProblemMyList: "delete from plass_mylist_problem where user_id = ? and problem_id = ?",
}
