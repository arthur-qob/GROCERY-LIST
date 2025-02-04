export default class User {

    #name
    #email
    #uid
    #profileImage
    #lists
    #items

    constructor(name, email, uid, profileImage, lists, items) {
        this.setName(name)
        this.setEmail(email)
        this.setUid(uid)
        this.setProfileImage(profileImage)
        this.setLists(lists)
        this.setItems(items)
    }

    getName() {
        return this.#name
    }

    setName(name) {
        if (!validateName(name))
            throw new ModelError(`Name "${name}" is invalid`)
        
        this.#name = name
    }

    getEmail() {
        return this.#email
    }

    setEmail(email) {
        if (!validateEmail)
            throw new ModelError(`Email "${email}" is invalid`)

        this.#email = email
    }

    getUid() {
        return this.#uid
    }

    setUid(uid) {
        this.#uid = uid
    }

    getProfileImage() {
        return this.#profileImage
    }

    setProfileImage(profileImage) {
        this.#profileImage = profileImage
    }

    // TODO: GET/SET LISTS
    // TODO: GET/SET ITEMS
}