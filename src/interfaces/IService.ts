export interface IService {
    additionalService?: any;
    availability: IAvailability
    category: IServiceCategory
    country: string
    customId?: string
    desc: string
    insuranceCoverage?: []
    licenseAndCertification?: []
    name: string
    photos?: []
    price: number
    providerId: string
    ratedBy: number
    ratings: number
    state: string
    subCategory: IServiceSubCategory
    _id: string
}

export interface IServiceCategory {
    _id: string;
    name: string;
    children: IServiceSubCategory
}

export interface IServiceSubCategory {
    _id: string;
    name: string;
}

export interface ICreateService {
    name: string,
    category: string;
    subCategory: string;
    country: string;
    state: string;
    price: number;
    desc: string;
    additionalService: [],
    availability: IAvailability
    media: any[]
}

interface IAvailability {
    days: string[];
    hours: {
        from: string;
        to: string;
    }
    
}


