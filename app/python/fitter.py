import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression


def fit(hue_frame_data):
    print('Begin to fit')
    y_data = np.array(hue_frame_data)
    x_data = np.linspace(0, len(y_data) - 1, len(y_data))

    x_data = x_data[:, np.newaxis]
    y_data = y_data[:, np.newaxis]
    poly_reg = PolynomialFeatures(degree=3)
    x_data_poly = poly_reg.fit_transform(x_data)
    model = LinearRegression()
    model.fit(x_data_poly, y_data)
    x_test = np.linspace(0, len(x_data) - 1, len(x_data))[:, np.newaxis]
    x_test_poly = poly_reg.fit_transform(x_test)
    predict_result = model.predict(x_test_poly)
    print('Fitting OK')
    return predict_result.reshape(1, -1)[0]
