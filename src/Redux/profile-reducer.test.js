import profileReducer, {addPostCreator} from "./profile-reducer";

test('renders learn react link', () => {
    //1. test data
    let action = addPostCreator("Толя тох");
    let state = {
        postsData : [
            {id: 1,likeCout:"57", dislikeCout:"12", date:"31.08.2020", message:"Наконец я начал учить реакт"},
            {id: 2,likeCout:"10432", dislikeCout:"1", date:"22.06.2000", message:"Толя кусок тупого дерьма"}
        ],
    }
    //2 action
    let newState = profileReducer(state,action );
    //3 expect
    expect(newState.postsData.length).toBe(3);
});