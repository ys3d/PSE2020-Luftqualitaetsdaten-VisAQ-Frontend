import cookie from "./node_modules/react-cookie"

const cookies = new Cookies();

export default class CookieNotice extends Component {

    handleClick = () => {
     this.props.toggle();
    };

    storeUserData = () => {

    }

    getUserData = () => {
        
    }

  render() {
    return (
     <div className="CookieNotice">
       <div className="modal_content">
       <span className="close" onClick={this.handleClick}>&times;    </span>
       <p>{t('CookieNotice')}</p>
       <Button variant="primary" onClick={}>{t("Accept")}</Button>{' '}
       <Button variant="link" onClick>{t("moreInfo")}</Button>{' '}
       <Button variant="primary" onClick>{t("Decline")}</Button>{' '}
      </div>
     </div>
    );
   }
  }