package controllers

import play.api.mvc.{Action, Controller}

object Index extends Controller with UserSession{

  def index = withAuth{ mailAddress => implicit request =>

    Ok(views.html.index.index())
  }

}
