export class AuthBuilder {
email: string 
password: string

	addEmail(email: string) {
		this.email = email;
		return this;
	}

	addPassword(password: string) {
		this.password = password;
		return this;
	}


	build() {
		return new AuthEntity(this);
	}
}

export class AuthEntity {
	email: string 
	password: string

	constructor(ob: AuthBuilder) {
		this.email = ob.email
		this.password = ob.password
	}
}
