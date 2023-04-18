import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/models/user.model';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: User): Promise<void> {
        const url = `${process.env.API_LOCAL_HOST}/api/user/activate/${user.activation_link}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Confirm Email!',
            template: './confirmation',
            context: {
                name: user.fullname,
                url,
            },
        });
    }
    async sendAdminConfirmation(admin: Admin): Promise<void> {
        const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        await this.mailerService.sendMail({
            to: admin.email,
            subject: 'Confirm Email!',
            template: './confirmation',
            context: {
                name: admin.fullname,
                url,
            },
        });
    }
}