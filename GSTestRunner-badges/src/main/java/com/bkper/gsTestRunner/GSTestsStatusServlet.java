package com.bkper.gsTestRunner;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonObjectParser;
import com.google.api.client.json.gson.GsonFactory;
import com.google.gson.Gson;

public class GSTestsStatusServlet extends HttpServlet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
	static final JsonFactory JSON_FACTORY = new GsonFactory();
	private Gson gson = new Gson();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String suiteName = req.getParameter("suite");
		String namespace = req.getParameter("namespace");

		HttpRequestFactory requestFactory = HTTP_TRANSPORT
				.createRequestFactory(new HttpRequestInitializer() {
					@Override
					public void initialize(HttpRequest request) {
						request.setParser(new JsonObjectParser(JSON_FACTORY));
					}
				});

		String url = "https://script.google.com/macros/s/AKfycbyWJJFIwoqnNudRMGse18qVNWw5aa7g03-iLmL_rjqO8mg-MjI/exec?suite=" + suiteName + "&format=json";

		if (namespace != null) {
			url += "&namespace=" + namespace;
		}


		HttpRequest request = requestFactory .buildGetRequest(new GenericUrl(url));
		request.setFollowRedirects(true);
		request.setConnectTimeout(10000);
		HttpResponse response = request.execute();

		String json = response.parseAsString();
		Result result = gson.fromJson(json, Result.class);

		InputStream in = GSTestsStatusServlet.class.getClassLoader()
				.getResourceAsStream(result.getStatus() + ".svg");

		resp.setContentType("image/svg+xml");
		resp.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT");
		resp.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		resp.addHeader("Cache-Control", "post-check=0, pre-check=0");
		resp.setHeader("Pragma", "no-cache");

		OutputStream out = resp.getOutputStream();

		// Copy the contents of the file to the output stream
		byte[] buf = new byte[1024];
		int count = 0;
		while ((count = in.read(buf)) >= 0) {
			out.write(buf, 0, count);
		}

		in.close();
		out.close();
	}

}
