export class TripClass {
    private travelers: string[];
    private _id:       string;
    private country:   string;
    private city:      string;
    private place:     string;
    private year:      number;
    private month:     string;
    private rating:    number;
    private notes:     string;
  


	constructor($travelers: string[], id:       string, $country:   string, $city:      string, $place:     string, $year:      number, $month:     string, $rating:    number, $notes:     string) {
		this.travelers = $travelers;
		this._id = id;
		this.country = $country;
		this.city = $city;
		this.place = $place;
		this.year = $year;
		this.month = $month;
		this.rating = $rating;
		this.notes = $notes;
	}


    /**
     * Getter $travelers
     * @return {string[]}
     */
	public get $travelers(): string[] {
		return this.travelers;
	}

    /**
     * Getter id
     * @return {      string}
     */
	public get id():       string {
		return this._id;
	}

    /**
     * Getter $country
     * @return {  string}
     */
	public get $country():   string {
		return this.country;
	}

    /**
     * Getter $city
     * @return {     string}
     */
	public get $city():      string {
		return this.city;
	}

    /**
     * Getter $place
     * @return {    string}
     */
	public get $place():     string {
		return this.place;
	}

    /**
     * Getter $year
     * @return {     number}
     */
	public get $year():      number {
		return this.year;
	}

    /**
     * Getter $month
     * @return {    string}
     */
	public get $month():     string {
		return this.month;
	}

    /**
     * Getter $rating
     * @return {   number}
     */
	public get $rating():    number {
		return this.rating;
	}

    /**
     * Getter $notes
     * @return {    string}
     */
	public get $notes():     string {
		return this.notes;
	}

    /**
     * Setter $travelers
     * @param {string[]} value
     */
	public set $travelers(value: string[]) {
		this.travelers = value;
	}

    /**
     * Setter id
     * @param {      string} value
     */
	public set id(value:       string) {
		this._id = value;
	}

    /**
     * Setter $country
     * @param {  string} value
     */
	public set $country(value:   string) {
		this.country = value;
	}

    /**
     * Setter $city
     * @param {     string} value
     */
	public set $city(value:      string) {
		this.city = value;
	}

    /**
     * Setter $place
     * @param {    string} value
     */
	public set $place(value:     string) {
		this.place = value;
	}

    /**
     * Setter $year
     * @param {     number} value
     */
	public set $year(value:      number) {
		this.year = value;
	}

    /**
     * Setter $month
     * @param {    string} value
     */
	public set $month(value:     string) {
		this.month = value;
	}

    /**
     * Setter $rating
     * @param {   number} value
     */
	public set $rating(value:    number) {
		this.rating = value;
	}

    /**
     * Setter $notes
     * @param {    string} value
     */
	public set $notes(value:     string) {
		this.notes = value;
	}

    
  

    

    
  
    
  }