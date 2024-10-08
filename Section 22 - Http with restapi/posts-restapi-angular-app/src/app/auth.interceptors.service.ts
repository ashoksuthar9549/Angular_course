import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Request is on its way');
        console.log(req.url);
        const modifiedReq = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        console.log('Request has been handled');
        return next.handle(modifiedReq);
    }
}