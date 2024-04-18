package space.ff2f.api.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Order(1)
@Component
public class MongoDataLoader implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {

    }
}
